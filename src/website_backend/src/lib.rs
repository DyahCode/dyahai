pub mod storages;
pub mod transaction;
pub mod users;
pub mod http;
pub mod stable_memory;
use candid::{ Nat, Principal};
use ic_cdk::api;
use ic_ledger_types::Memo;
use num_bigint::BigUint;
use serde_json::to_string;
pub use storages::types::*;
pub use transaction::*;
pub use users::*;
pub use http::*;

// #[ic_cdk::update]
// pub async fn check_balance() -> String {
//     let principal = ic_cdk::api::id();
//     let result = transaction::check_canisters_balance(principal).await;

//     match result {
//         Ok(balance) => {
//             let trx_str = to_string(&balance).unwrap_or_else(|_| "{}".to_string());
//             trx_str
//         }
//         Err(err) => {
//             format!("Call to ledger failed: {:?}", err)
//         }
//     }
// }
// #[ic_cdk::update]
// pub async fn tf_balance() -> String {
//     let principal = ic_cdk::caller();
//     let result = transaction::transfer_to_client(principal).await;

//     match result {
//         Ok(tf) => {
//             let trx_str = to_string(&tf).unwrap_or_else(|_| "{}".to_string());
//             trx_str
//         }
//         Err(err) => {
//             format!("Call to ledger failed: {:?}", err)
//         }
//     }
// }

#[update]
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

                            users::add_credit(principal, sumcredit);
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

                        users::upgrade_tier(principal, new_tier.clone());
                        ic_cdk::println!("Plan upgraded to {:?} for user {}", new_tier, principal);

                        match new_tier {
                            UserTier::Premium => {
                                users::add_credit(principal, 50);
                                ic_cdk::println!("Added 50 credits to Premium user: {}", principal);
                            }
                            UserTier::Ultimate => {
                                users::add_credit(principal, 100);
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

#[query]
pub fn get_transaction() -> Vec<String> {
    let principal = ic_cdk::caller();
    if !users::is_registered(principal) {
        ic_cdk::trap("No user found");
    } else {
        transaction::retrieve_trx(principal)
    }
}

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
    if !users::is_registered(principal) {
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
    if !users::is_registered(principal) {
        users::save_user(principal.clone());
    }
    principal.to_string()
}

#[query]
pub async fn get_balance() -> u8 {
    let principal = ic_cdk::caller();

    let user_data = users::get_user_data(principal);

    user_data.credits.clone()
}

#[query]
pub async fn get_tier() -> String {
    let principal = ic_cdk::caller();

    let user_data = users::get_user_data(principal);

    ic_cdk::print(format!(
        "user with principal {} login with level: {:?}",
        principal, user_data.tier
    ));

    format!("{:?}", user_data.tier.clone())
}

#[query]
pub async fn get_images_by_principal() -> Vec<String> {
    let principal = ic_cdk::caller();
    if !users::is_registered(principal) {
        ic_cdk::trap("No user found");
    } else {
        let cid = storages::retrieve_images(principal);
        cid.iter().map(|cid| cid.to_string()).collect()
    }
}

#[update]
pub async fn delete_image_by_index(index: usize) {
    let principal = ic_cdk::caller();
    if !users::is_registered(principal) {
        ic_cdk::trap("No user found for delete image");
    } else {
        storages::delete_image(principal, index);
    }
}

#[cfg(test)]
mod tests {
    use crate::*;
    use candid::export_service;
    use std::fs::write;

    #[test]
    fn export_candid() {
        export_service!();
        write("website_backend.did", __export_service()).expect("Unable to write candid file");
    }
}
