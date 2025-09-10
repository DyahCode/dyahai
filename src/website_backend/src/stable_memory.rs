pub use crate::users::*;
use crate::transaction::*;
use crate::storages::*;
use ic_cdk::storage;
use ic_cdk::{
    post_upgrade, pre_upgrade,
};
use candid::{CandidType, Deserialize};
#[derive(CandidType, Deserialize)]
pub struct AppState {
    pub trx_store: TRXStore,
    pub users_store: UserStore,
    pub image_store: ImageStore,
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