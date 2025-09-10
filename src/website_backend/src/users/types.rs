use candid::Principal;
use std::cell::RefCell;
use std::collections::BTreeMap;

pub type UserStore = BTreeMap<Principal, UserData>;

use candid::{CandidType, Deserialize};

#[derive(Clone, CandidType, Deserialize)]
pub struct UserData {
    pub credits: u8,
    pub tier: UserTier,
}

thread_local! {
    pub static USERS_STORE: RefCell<UserStore> = RefCell::default();
}


#[derive(Debug, CandidType, Deserialize, Clone, PartialEq)]
pub enum UserTier {
    Basic,
    Premium,
    Ultimate,
}

