use candid::Principal;
mod types;
use crate::wallet::*;
use candid::Nat;
use ic_cdk::api;
pub use types::*;
use ic_cdk::query;

pub fn one_month_from_now() -> u64 {
    const NANOS_PER_SECOND: u64 = 1_000_000_000;
    const SECONDS_PER_DAY: u64 = 24 * 60 * 60;
    const DAYS_PER_MONTH: u64 = 30;
    let now = api::time();
    let one_month_ns = DAYS_PER_MONTH * SECONDS_PER_DAY * NANOS_PER_SECOND;
    now + one_month_ns
}

pub async fn save_user(principal: Principal) {
    let data = UserData {
        tier: UserTier::Basic,
        expired: None,
    };
    USERS_STORE.with(|user| {
        user.borrow_mut().insert(principal.clone(), data);
    });
    add_credit(principal, 3, "Added 3 DYA token".into()).await;
    ic_cdk::println!("User Stored for principal: {}", principal);
}

pub fn upgrade_tier(principal: Principal, new_tier: UserTier) {
    USERS_STORE.with(|user| {
        if let Some(user_data) = user.borrow_mut().get_mut(&principal) {
            user_data.tier = new_tier;
            user_data.expired = Some(one_month_from_now());
            ic_cdk::println!("Tier upgraded for principal: {}", principal);
        } else {
            ic_cdk::trap("User not found for tier upgrade");
        }
    });
}


pub fn downgrade_tier(principal: Principal) {
    USERS_STORE.with(|user| {
        let mut users = user.borrow_mut();
        if let Some(user_data) = users.get_mut(&principal) {
            if user_data.tier != UserTier::Basic {
                if let Some(expired_at) = user_data.expired {
                    let now = api::time();
                    if now >= expired_at {
                        user_data.tier = UserTier::Basic;
                        user_data.expired = None;
                        println!("Tier downgraded for principal: {}", principal);
                    }
                }
            }
        } else {
            ic_cdk::trap("User not found for tier downgrade");
        }
    });
}

pub async fn add_credit(principal: Principal, additional_credit: u8, message: String) {
    if !is_registered(principal) {
        ic_cdk::trap("No user found for adding credit");
    }
    let memo = Some(Memo(message.into_bytes().into()));
    let _mint = transfer_token(TransferArg {
        from_subaccount: None,
        to: principal.into(),
        fee: None,
        created_at_time: Some(ic_cdk::api::time()),
        memo: memo,
        amount: Nat::from(additional_credit as u64) * Nat::from(100_000_000u64),
    })
    .await;
    ic_cdk::println!("Minted {} DYA tokens to {}", additional_credit, principal);
    ic_cdk::println!(
        "Added credit {} for principal: {}",
        additional_credit,
        principal
    );
}

pub fn get_user_data(principal: Principal) -> UserData {
    USERS_STORE.with(|user| {
        user.borrow()
            .get(&principal)
            .cloned()
            .unwrap_or_else(|| ic_cdk::trap("User not found"))
    })
}

#[query]
pub fn is_registered(principal: Principal) -> bool {
    USERS_STORE.with(|user| user.borrow().contains_key(&principal))
}
