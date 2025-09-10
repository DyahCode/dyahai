use candid::Principal;
use ic_cdk::{init, update};
mod types;
pub use types::*;


#[init]
fn init() {
    ic_cdk::println!("Canister initialized.");
}

pub fn save_user(principal: Principal) {
    let data = UserData {
        credits: 3,
        tier: UserTier::Basic,
    };
    USERS_STORE.with(|user| {
        user.borrow_mut().insert(principal.clone(), data);
    });
    ic_cdk::println!("User Stored for principal: {}", principal);
}

pub fn upgrade_tier(principal: Principal, new_tier: UserTier) {
    USERS_STORE.with(|user| {
        if let Some(user_data) = user.borrow_mut().get_mut(&principal) {
            user_data.tier = new_tier;
            ic_cdk::println!("Tier upgraded for principal: {}", principal);
        } else {
            ic_cdk::trap("User not found for tier upgrade");
        }
    });
}

pub fn add_credit(principal: Principal, additional_credit: u8) {
    USERS_STORE.with(|user| {
        if let Some(user_data) = user.borrow_mut().get_mut(&principal) {
            user_data.credits += additional_credit;
            ic_cdk::println!(
                "Added credit {} for principal: {}",
                additional_credit,
                principal
            );
        } else {
            ic_cdk::trap(&format!("User with principal {} not found", principal));
        }
    });
}

#[update]
pub fn add_credit_for_dev(principalid: String) -> String {
    let principal = Principal::from_text(principalid).unwrap();
    USERS_STORE.with(|user| {
        if let Some(user_data) = user.borrow_mut().get_mut(&principal) {
            user_data.credits += 5;
            ic_cdk::println!("Added credit {} for principal: {}", 5, principal);
            format!("Added credit {} for principal: {}", 5, principal)
        } else {
            format!("User with principal {} not found", principal)
        }
    })
}

#[update]
pub fn reduction_credit(principal: Principal) {
    USERS_STORE.with(|user| {
        if let Some(user_data) = user.borrow_mut().get_mut(&principal) {
            if user_data.credits > 0 {
                user_data.credits -= 1;
                ic_cdk::println!("Reduced credit by 1 for principal: {}", principal);
            } else {
                ic_cdk::trap(&format!("Insufficient credit for principal: {}", principal));
            }
        } else {
            ic_cdk::trap(&format!("User with principal {} not found", principal));
        }
    });
}

pub fn get_user_data(principal: Principal) -> UserData {
    USERS_STORE.with(|user| {
        user.borrow()
            .get(&principal)
            .cloned()
            .unwrap_or_else(|| ic_cdk::trap("User not found"))
    })
}

pub fn is_registered(principal: Principal) -> bool {
    USERS_STORE.with(|user| user.borrow().contains_key(&principal))
}
