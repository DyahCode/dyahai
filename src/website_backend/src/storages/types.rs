use std::collections::BTreeMap;
use candid::{Principal};
use std::cell::RefCell;
use candid::{CandidType, Deserialize};

thread_local! {
    pub static IMAGE_STORE: RefCell<NFTs> = RefCell::default();
}

pub type NFTs = BTreeMap<Principal, Vec<Metadata>>;

#[derive(Debug, Clone,CandidType, Deserialize)]
pub struct Metadata {
    pub id: String,
    pub name: String,
    pub description: Option<String>,
    pub assets: Assets,
    pub created_at_time: u64
}
#[derive(Debug, Clone,CandidType, Deserialize)]
pub struct Assets {
    pub url: String,
    pub mime: String,
    pub purpose: Option<String>
}