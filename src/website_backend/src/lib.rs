mod storages;
mod transaction;
mod users_store;
use crate::storages::{ImageStore, IMAGE_STORE};
use crate::transaction::ParsedTransaction;
use crate::transaction::{TRXStore, TRX_STORE};
use crate::users_store::{UserData, UserTier};
use crate::users_store::{UserStore, USERS_STORE};
use candid::{CandidType, Deserialize, Nat, Principal};
use ic_cdk::storage;
use ic_cdk::{
    api,
    api::management_canister::http_request::{
        http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod, HttpResponse,
        TransformArgs, TransformContext, TransformFunc,
    },
    post_upgrade, pre_upgrade, query, update,
};
use ic_ledger_types::Memo;
use num_bigint::BigUint;
use serde_json::to_string;
use std::vec;
use serde::Serialize;
#[derive(CandidType, Deserialize)]
pub struct AppState {
    pub trx_store: TRXStore,
    pub users_store: UserStore,
    pub image_store: ImageStore,
}
#[derive(Serialize)]
struct InputPayload {
    input: InputImages,
}
#[derive(Serialize)]
struct InputImages {
    source_image: String,
    target_image: String,
    source_indexes: String,
    target_indexes: String,
    background_enhance: bool,
    face_restore: bool,
    face_upsample: bool,
    upscale: u8,
    codeformer_fidelity: f32,
    output_format: String,
}

#[query(name = "transform")]
fn transform(raw: TransformArgs) -> HttpResponse {
    HttpResponse {
        status: raw.response.status,
        headers: vec![],
        body: raw.response.body,
    }
}

const API_BASE: &str = "https://dyahai-proxy.vercel.app/style";

#[derive(Serialize, CandidType, Debug)]
pub struct ResponseAPI {
    status: bool,
    message: String,
    result: String,
}
#[update]
pub async fn send_http_post(source_image: String, target_image: String) -> ResponseAPI {
    let principal = ic_cdk::caller();
    ic_cdk::println!("Principal: {}", principal);

    if !users_store::is_registered(principal) {
        ic_cdk::trap("User not registered");
    }

    let user_data = users_store::get_user_data(principal.clone());

    if user_data.credits == 0 {
        ic_cdk::println!("Insufficient credit for this user");
        return ResponseAPI {
            status: false,
            message: "Insufficient credit for this user".to_string(),
            result: "null".to_string(),
        };
    }

    ic_cdk::println!("[DEBUG] Source URL: {}", source_image);
    ic_cdk::println!("[DEBUG] Target URL: {}", target_image);

    let url = format!("{}/run", API_BASE);

    let payload = InputPayload {
        input: InputImages {
            source_image,
            target_image,
            source_indexes: "-1".to_string(),
            target_indexes: "-1".to_string(),
            background_enhance: true,
            face_restore: true,
            face_upsample: true,
            upscale: 1,
            codeformer_fidelity: 0.2,
            output_format: "JPEG".to_string(),
        },
    };

    let json_payload = serde_json::to_vec(&payload).expect("Failed to serialize payload");

    let request_headers = vec![
        HttpHeader {
            name: "Content-Type".to_string(),
            value: "application/json".to_string(),
        },
        HttpHeader {
            name: "X-Idempotency-Key".to_string(),
            value: format!(
                "{}{}",
                ic_cdk::api::caller().to_text(),
                ic_cdk::api::time().to_string()
            ),
        },
    ];

    let request = CanisterHttpRequestArgument {
        url,
        max_response_bytes: Some(2_000_000),
        method: HttpMethod::POST,
        headers: request_headers,
        body: Some(json_payload),
        transform: Some(TransformContext {
            function: TransformFunc(candid::Func {
                principal: ic_cdk::api::id(),
                method: "transform".to_string(),
            }),
            context: vec![],
        }),
    };

    match http_request(request, 21_000_000_000).await {
        Ok((response,)) => {
            let body_str = String::from_utf8_lossy(&response.body);
            ic_cdk::println!("[DEBUG] Raw response: {}", body_str);

            if let Ok(value) = serde_json::from_str::<serde_json::Value>(&body_str) {
                if let Some(error) = value.get("error") {
                    return ResponseAPI {
                        status: false,
                        message: error
                            .as_str()
                            .unwrap_or("Failed to check job status")
                            .to_string(),
                        result: "null".to_string(),
                    };
                }
                let status = value
                    .get("status")
                    .and_then(|s| s.as_str())
                    .unwrap_or("INVALID");

                ic_cdk::println!("[DEBUG] Status: {}", status);

                let image_b64 = value
                    .get("output")
                    .and_then(|o| o.get("image"))
                    .and_then(|i| i.as_str());
                users_store::reduction_credit(principal.clone());
                ResponseAPI {
                    status: true,
                    message: "completed".to_string(),
                    result: image_b64.unwrap_or("").to_string(),
                }
            } else {
                ic_cdk::println!("[DEBUG] Failed to parse JSON.");

                ResponseAPI {
                    status: false,
                    message: "failed parse JSON".to_string(),
                    result: "null".to_string(),
                }
            }
        }
        Err((_r, _m)) => ResponseAPI {
            status: false,
            message: _m.to_string(),
            result: "null".to_string(),
        },
    }
}

#[ic_cdk::update]
pub async fn check_balance() -> String {
    let principal = ic_cdk::api::id();
    let result = transaction::check_canisters_balance(principal).await;

    match result {
        Ok(balance) => {
            let trx_str = to_string(&balance).unwrap_or_else(|_| "{}".to_string());
            trx_str
        }
        Err(err) => {
            format!("Call to ledger failed: {:?}", err)
        }
    }
}
#[ic_cdk::update]
pub async fn tf_balance() -> String {
    let principal = ic_cdk::caller();
    let result = transaction::transfer_to_client(principal).await;

    match result {
        Ok(tf) => {
            let trx_str = to_string(&tf).unwrap_or_else(|_| "{}".to_string());
            trx_str
        }
        Err(err) => {
            format!("Call to ledger failed: {:?}", err)
        }
    }
}

#[ic_cdk::update]
pub async fn get_tx_summary(
    block_height: u64,
    memo: u64,
    tx_type: String,
    credit: String,
    plan: String,
) -> String {
    ic_cdk::println!(
        "Fetching block at height: {}, type: {:?}",
        block_height,
        tx_type
    );

    let principal = ic_cdk::caller();
    let memo_obj = Memo(memo);

    // Set message sesuai tx_type
    let message = match tx_type.as_str() {
        "credit" => format!("Added {} credit ", credit),
        "plan" => format!("Upgraded plan to {}", plan),
        _ => {
            ic_cdk::println!("Invalid tx_type: {}", tx_type);
            return format!(
                "{{\"status\": \"error\", \"message\": \"Invalid tx_type: {}\"}}",
                tx_type
            );
        }
    };

    let result = transaction::get_parsed_transaction(block_height, message).await;

    match result {
        Ok(tx) => {
            ic_cdk::println!("📜 Transaction Summary: {:?}", tx);
            ic_cdk::println!("📥 Memo from frontend: {:?}", memo_obj);
            ic_cdk::println!("📤 Memo from transaction: {:?}", tx.memo);

            if tx.memo == Some(memo_obj) {
                match tx_type.as_str() {
                    "credit" => {
                        if let Some(amount) = tx.amount.clone() {
                            let nat_amount = Nat::from(amount.e8s());
                            ic_cdk::println!("Nat amount: {:?}", nat_amount);

                            let sumcredit = calculate_credit_from_icp(nat_amount) as u8;
                            ic_cdk::println!("Credit calculated: {}", sumcredit);

                            users_store::add_credit(principal, sumcredit);
                            ic_cdk::println!("Credit added to {}", principal);
                        } else {
                            ic_cdk::println!("No amount in transaction");
                        }
                    }
                    "plan" => {
                        let new_tier = match plan.to_lowercase().as_str() {
                            "basic" => UserTier::Basic,
                            "premium" => UserTier::Premium,
                            "ultimate" => UserTier::Ultimate,
                            _ => {
                                ic_cdk::println!("Invalid plan: {}", plan);
                                return format!(
                                    "{{\"status\": \"error\", \"message\": \"Invalid plan: {}\"}}",
                                    plan
                                );
                            }
                        };

                        users_store::upgrade_tier(principal, new_tier.clone());
                        ic_cdk::println!(
                            "Plan upgraded to {:?} for user {}",
                            new_tier,
                            principal
                        );

                        match new_tier {
                            UserTier::Premium => {
                                users_store::add_credit(principal, 50);
                                ic_cdk::println!(
                                    "Added 50 credits to Premium user: {}",
                                    principal
                                );
                            }
                            UserTier::Ultimate => {
                                users_store::add_credit(principal, 100);
                                ic_cdk::println!(
                                    "Added 100 credits to Ultimate user: {}",
                                    principal
                                );
                            }
                            _ => {}
                        }
                    }

                    _ => {}
                }
            } else {
                ic_cdk::println!(
                    "Memo mismatch: expected '{}', got {:?}",
                    memo_obj.0,
                    tx.memo
                );
            }

            let trx_str = to_string(&tx).unwrap_or_else(|_| "{}".to_string());
            transaction::save_trx(principal, tx);

            trx_str
        }
        Err(e) => {
            ic_cdk::println!("Error getting transaction: {}", e);
            format!("{{\"status\": \"error\", \"message\": \"{}\"}}", e)
        }
    }
}

#[ic_cdk::query]
pub fn get_transaction() -> Vec<String> {
    let principal = ic_cdk::caller();
    if !users_store::is_registered(principal) {
        ic_cdk::trap("No user found");
    } else {
        transaction::retrieve_trx(principal)
    }
}

#[ic_cdk::query]
pub fn calculate_credit_from_icp(amount: Nat) -> u64 {
    const ICP_PRICE_USD: f64 = 6.2;
    const GENERATE_PRICE: f64 = 0.1;
    const ICP_PRICE_XDR: f64 = 4.2;
    const REQUEST_IN_CYCLE: f64 = 10_800_000_000.0;
    const ICP_CYCLE: f64 = ICP_PRICE_XDR * 1_000_000_000_000.0;

    let new_generate_price = GENERATE_PRICE / ICP_PRICE_USD;
    let request_price = REQUEST_IN_CYCLE / ICP_CYCLE;
    let one_credit_is = new_generate_price + request_price;

    let big_amount: &BigUint = &amount.0;
    let amount_e8s: f64 = big_amount.to_string().parse().unwrap_or(0.0);

    let icp = amount_e8s / 100_000_000.0;

    let credit = icp / one_credit_is;

    credit.floor() as u64
}

#[query]
pub async fn get_account_id_for_canister() -> String {
    let principal = api::id();
    ic_cdk::println!("Principal ID from canister backend: {}", principal);
    principal.to_text()
}

#[update]
pub async fn save_image_to_store(cid: String) {
    let principal = ic_cdk::caller();
    if !users_store::is_registered(principal) {
        ic_cdk::trap("No user found for saving CID");
    } else {
        storages::save_image(principal, cid.clone());
        ic_cdk::println!("Image successfully saved: {}", cid.clone());
    }
}

#[update]
pub async fn initialize_credit() -> String {
    let principal = ic_cdk::caller();
    if principal == Principal::anonymous() {
        ic_cdk::trap("Anonymous principal not allowed");
    }
    if !users_store::is_registered(principal) {
        users_store::save_user(principal.clone());
    }
    principal.to_string()
}

#[query]
pub async fn get_balance() -> u8 {
    let principal = ic_cdk::caller();

    let user_data = users_store::get_user_data(principal);

    user_data.credits.clone()
}

#[query]
pub async fn get_tier() -> String {
    let principal = ic_cdk::caller();

    let user_data = users_store::get_user_data(principal);

    ic_cdk::print(format!(
        "user with principal {} login with level: {:?}",
        principal, user_data.tier
    ));

    format!("{:?}", user_data.tier.clone())
}

#[query]
pub async fn get_images_by_principal() -> Vec<String> {
    let principal = ic_cdk::caller();
    if !users_store::is_registered(principal) {
        ic_cdk::trap("No user found");
    } else {
        let cid = storages::retrieve_images(principal);
        cid.iter().map(|cid| cid.to_string()).collect()
    }
}

#[update]
pub async fn delete_image_by_index(index: usize) {
    let principal = ic_cdk::caller();
    if !users_store::is_registered(principal) {
        ic_cdk::trap("No user found for delete image");
    } else {
        storages::delete_image(principal, index);
    }
}

#[pre_upgrade]
fn pre_upgrade() {
    let trx = TRX_STORE.with(|s| s.borrow().clone());
    let users = USERS_STORE.with(|s| s.borrow().clone());
    let images = IMAGE_STORE.with(|s| s.borrow().clone());

    let state = AppState {
        trx_store: trx,
        users_store: users,
        image_store: images,
    };

    storage::stable_save((state,)).unwrap();
    ic_cdk::println!("Pre-upgrade: All state saved.");
}

#[post_upgrade]
fn post_upgrade() {
    let Ok((state,)) = storage::stable_restore::<(AppState,)>() else {
        ic_cdk::trap("Failed to restore state");
    };

    TRX_STORE.with(|s| *s.borrow_mut() = state.trx_store);
    USERS_STORE.with(|s| *s.borrow_mut() = state.users_store);
    IMAGE_STORE.with(|s| *s.borrow_mut() = state.image_store);

    ic_cdk::println!("Post-upgrade: All state restored.");
}

ic_cdk::export_candid!();
