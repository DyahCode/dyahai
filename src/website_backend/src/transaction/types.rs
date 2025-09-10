use std::cell::RefCell;
use std::collections::BTreeMap;
use candid::Principal;
use candid::{CandidType, Deserialize};
use ic_ledger_types::{
    AccountIdentifier,Memo, Timestamp, Tokens
};
use serde::Serialize;

#[derive(CandidType, Deserialize, Serialize, Debug, Clone)]
pub struct ParsedTransaction {
    pub from: Option<AccountIdentifier>,
    pub to: Option<AccountIdentifier>,
    pub amount: Option<Tokens>,
    pub memo: Option<Memo>,
    pub message : Option<String>,
    pub timestamp: Timestamp,
}

pub type TRXStore = BTreeMap<Principal, Vec<ParsedTransaction>>;

thread_local! {
    pub static TRX_STORE: RefCell<TRXStore> = RefCell::default();
}




