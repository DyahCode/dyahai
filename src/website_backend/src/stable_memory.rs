pub use crate::users::*;
use crate::storages::*;
use crate::wallet::*;
use ic_cdk::storage;
use ic_cdk::{
    post_upgrade, pre_upgrade,
};
use candid::{CandidType, Deserialize};
#[derive(CandidType, Deserialize)]
pub struct AppState {
    pub users_store: UserStore,
    pub image_store: NFTs,
    pub init_args: InitArgs
}

#[pre_upgrade]
fn pre_upgrade() {
    let users = USERS_STORE.with(|s| s.borrow().clone());
    let images = IMAGE_STORE.with(|s| s.borrow().clone());
    let args = LEDGERID.with(|s| s.borrow().clone()).expect("Failed to get init args");

    let state = AppState {
        users_store: users,
        image_store: images,
        init_args: args
    };

    storage::stable_save((state,)).unwrap();
    ic_cdk::println!("Pre-upgrade: All state saved.");
}

#[post_upgrade]
fn post_upgrade() {
    let Ok((state,)) = storage::stable_restore::<(AppState,)>() else {
        ic_cdk::trap("Failed to restore state");
    };

    USERS_STORE.with(|s| *s.borrow_mut() = state.users_store);
    IMAGE_STORE.with(|s| *s.borrow_mut() = state.image_store);
    LEDGERID.with(|s| *s.borrow_mut() = Some(state.init_args));

    ic_cdk::println!("Post-upgrade: All state restored.");
}