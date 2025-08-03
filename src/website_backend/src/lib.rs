pub mod http;
mod storages;
mod transaction;
mod users_store;

// use crate::http::StyleStatusResult;
use crate::transaction::ParsedTransaction;
use crate::users_store::{UserData, UserTier};
use candid::{Nat, Principal,CandidType, Deserialize};
use ic_cdk::{api,post_upgrade, pre_upgrade, query, update, api::management_canister::http_request::{HttpResponse, TransformArgs}};
use ic_ledger_types::{Memo};
use num_bigint::BigUint;
use serde_json::to_string;
use crate::transaction::{TRXStore, TRX_STORE};
use crate::users_store::{UserStore, USERS_STORE};
use crate::storages::{ImageStore, IMAGE_STORE};
use ic_cdk::storage;

#[derive(CandidType, Deserialize)]
pub struct AppState {
    pub trx_store: TRXStore,
    pub users_store: UserStore,
    pub image_store: ImageStore,
}

#[ic_cdk::update]
pub async fn check_balance() -> String {
    let principal = ic_cdk::api::id();
    let result = transaction::check_canisters_balance(principal).await;

    match result {
        Ok(balance) => {
            let trx_str = to_string(&balance).unwrap_or_else(|_| "{}".to_string());
            trx_str
        },
        Err(err) => {
            format!("Call to ledger failed: {:?}", err)
        },
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
        },
        Err(err) => {
            format!("Call to ledger failed: {:?}", err)
        },
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
        "📦 Fetching block at height: {}, type: {:?}",
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
            ic_cdk::println!("⚠️ Invalid tx_type: {}", tx_type);
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
                            ic_cdk::println!("💰 Nat amount: {:?}", nat_amount);

                            let sumcredit = calculate_credit_from_icp(nat_amount) as u8;
                            ic_cdk::println!("✅ Credit calculated: {}", sumcredit);

                            users_store::add_credit(principal, sumcredit);
                            ic_cdk::println!("✅ Credit added to {}", principal);
                        } else {
                            ic_cdk::println!("⚠️ No amount in transaction");
                        }
                    }
                    "plan" => {
                        let new_tier = match plan.to_lowercase().as_str() {
                            "basic" => UserTier::Basic,
                            "premium" => UserTier::Premium,
                            "ultimate" => UserTier::Ultimate,
                            _ => {
                                ic_cdk::println!("❌ Invalid plan: {}", plan);
                                return format!(
                                    "{{\"status\": \"error\", \"message\": \"Invalid plan: {}\"}}",
                                    plan
                                );
                            }
                        };

                        users_store::upgrade_tier(principal, new_tier.clone());
                        ic_cdk::println!(
                            "🚀 Plan upgraded to {:?} for user {}",
                            new_tier,
                            principal
                        );

                        // 💳 Tambahkan kredit sesuai plan
                        match new_tier {
                            UserTier::Premium => {
                                users_store::add_credit(principal, 50);
                                ic_cdk::println!(
                                    "💰 Added 50 credits to Premium user: {}",
                                    principal
                                );
                            }
                            UserTier::Ultimate => {
                                users_store::add_credit(principal, 100);
                                ic_cdk::println!(
                                    "💰 Added 100 credits to Ultimate user: {}",
                                    principal
                                );
                            }
                            _ => {} // Basic tidak menambah credit
                        }
                    }

                    _ => {}
                }
            } else {
                ic_cdk::println!(
                    "❌ Memo mismatch: expected '{}', got {:?}",
                    memo_obj.0,
                    tx.memo
                );
            }

            // Simpan transaksi
            let trx_str = to_string(&tx).unwrap_or_else(|_| "{}".to_string());
            transaction::save_trx(principal, tx);

            trx_str
        }
        Err(e) => {
            ic_cdk::println!("❌ Error getting transaction: {}", e);
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
    // Sesuaikan harga dari frontend
    const ICP_PRICE_USD: f64 = 6.2;
    const GENERATE_PRICE: f64 = 0.1;
    const ICP_PRICE_XDR: f64 = 4.2;
    const REQUEST_IN_CYCLE: f64 = 10_800_000_000.0;
    const ICP_CYCLE: f64 = ICP_PRICE_XDR * 1_000_000_000_000.0;

    // Hitung nilai 1 credit dalam ICP
    let new_generate_price = GENERATE_PRICE / ICP_PRICE_USD;
    let request_price = REQUEST_IN_CYCLE / ICP_CYCLE;
    let one_credit_is = new_generate_price + request_price;

    // Konversi Nat (BigUint) ke f64
    let big_amount: &BigUint = &amount.0;
    let amount_e8s: f64 = big_amount.to_string().parse().unwrap_or(0.0);

    // Konversi e8s ke ICP
    let icp = amount_e8s / 100_000_000.0;

    // Hitung berapa kredit yang didapat
    let credit = icp / one_credit_is;

    // Bulatkan ke bawah agar tidak memberikan kredit berlebih
    credit.floor() as u64
}

#[query]
pub async fn get_account_id_for_canister() -> String {
    let principal = api::id();
    ic_cdk::println!("Principal ID dari canister backend: {}", principal);
    principal.to_text()
}

#[update]
pub async fn send_http_post_request(image_url: String, style_url: String) -> Vec<u8> {
    let principal = ic_cdk::caller();
    ic_cdk::println!("Principal: {}", principal);

    if !users_store::is_registered(principal) {
        ic_cdk::trap("User not registered");
    }

    let user_data = users_store::get_user_data(principal.clone());

    // Validasi kredit
    match user_data.tier {
        users_store::UserTier::Basic | users_store::UserTier::Premium => {
            if user_data.credits == 0 {
                ic_cdk::println!("Insufficient credit for this user");
                return vec![0];
            }
        }
        users_store::UserTier::Ultimate => {
            // Akses bebas
        }
    }

    // Kirim langsung URL ke fungsi HTTP POST
    let response = http::send_http_post(image_url.clone(), style_url.clone()).await;

    ic_cdk::println!("Jumlah data respons: {:?}", response.len());

    if user_data.tier != users_store::UserTier::Ultimate {
        users_store::reduction_credit(principal.clone());
    }

    ic_cdk::println!("Kredit setelah pengurangan: {}", user_data.credits);

    response.into()
}


#[update]
pub async fn save_image_to_store(cid: String) {
    let principal = ic_cdk::caller();
    if !users_store::is_registered(principal) {
        ic_cdk::trap("No user found for saving CID");
    } else {
        storages::save_image(principal, cid);
        ic_cdk::println!("Gambar berhasil disimpan: ");
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

    // langsung ambil user_data
    let user_data = users_store::get_user_data(principal);

    ic_cdk::print(format!(
        "Pengguna dengan principal {} login dengan level: {:?}",
        principal, user_data.tier
    ));

    user_data.credits.clone()
}

#[query]
pub async fn get_tier() -> String {
    let principal = ic_cdk::caller();

    // langsung ambil user_data
    let user_data = users_store::get_user_data(principal);

    ic_cdk::print(format!(
        "Pengguna dengan principal {} login dengan level: {:?}",
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
    ic_cdk::println!("✅ Pre-upgrade: All state saved.");
}

#[post_upgrade]
fn post_upgrade() {
    let Ok((state,)) = storage::stable_restore::<(AppState,)>() else {
        ic_cdk::trap("❌ Failed to restore state");
    };

    TRX_STORE.with(|s| *s.borrow_mut() = state.trx_store);
    USERS_STORE.with(|s| *s.borrow_mut() = state.users_store);
    IMAGE_STORE.with(|s| *s.borrow_mut() = state.image_store);

    ic_cdk::println!("✅ Post-upgrade: All state restored.");
}


ic_cdk::export_candid!();
