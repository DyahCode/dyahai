use std::collections::BTreeMap;
use candid::Principal;
use std::cell::RefCell;

thread_local! {
    pub static IMAGE_STORE: RefCell<ImageStore> = RefCell::default();
}

pub type ImageStore = BTreeMap<Principal, Vec<String>>;