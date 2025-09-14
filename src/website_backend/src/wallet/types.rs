use candid::CandidType;
use serde::Deserialize;
use ic_cdk_macros::init;
use std::cell::RefCell;

#[derive(Clone, CandidType, Deserialize, Debug)]
pub struct InitArgs {
    pub canister_ledger: String,
}

#[derive(Clone, CandidType, Deserialize, Debug)]
pub struct UpgradeArgs {
    pub canister_ledger: Option<String>,
}

#[derive(Clone, CandidType, Deserialize, Debug)]
pub enum IndexArgs {
    Init(InitArgs),
    Upgrade(UpgradeArgs),
}

thread_local! {
    pub static LEDGERID: RefCell<Option<InitArgs>> = RefCell::new(None);
}

#[init]
fn init(args: Option<IndexArgs>) {
    match args {
        Some(IndexArgs::Init(init_args)) => {
            LEDGERID.with(|s| *s.borrow_mut() = Some(init_args.clone()));
            ic_cdk::println!("Init with canister ledger: {}", init_args.canister_ledger);
        }
        Some(IndexArgs::Upgrade(upgrade_args)) => {
            if let Some(new_ledger) = upgrade_args.canister_ledger {
                LEDGERID.with(|s| *s.borrow_mut() = Some(InitArgs {
                    canister_ledger: new_ledger.clone(),
                }));
                ic_cdk::println!("Upgrade updated canister ledger: {}", new_ledger);
            } else {
                ic_cdk::println!("Upgrade called but no new ledger provided, keeping old value");
            }
        }
        None => {
            ic_cdk::println!("⚠️ Init called without args, skipping (already initialized?)");
        }
    }
}


