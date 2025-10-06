use candid::Nat;
use candid::Principal;
pub use icrc_ledger_types::icrc1::{
    account::{Account, DEFAULT_SUBACCOUNT},
    transfer::{BlockIndex, Memo, TransferArg, TransferError},
};
use ic_cdk_macros::init;
pub use icrc7_types::icrc7_types::{Icrc7TokenMetadata};
pub mod types;
pub use types::*;
pub use crate::storages::*;
use crate::is_registered;
pub async fn transfer_token(args: TransferArg) -> Result<BlockIndex, TransferError> {
    let principal = LEDGERID
        .with(|s| s.borrow().as_ref().map(|c| c.canister_ledger_token.clone()))
        .expect("Ledger canister ID not set");
    let ledger_principal = Principal::from_text(principal).expect("Invalid ledger canister ID");
    let (response,): (Result<BlockIndex, TransferError>,) = ic_cdk::call(
        ledger_principal,
        "icrc1_transfer",
        (args,),
    )
    .await
    .map_err(|e| TransferError::GenericError {
        error_code: Nat::from(500u64),
        message: format!("{:?}", e),
    })?;
    ic_cdk::println!("Response: {:#?}", response);
    response
}

#[ic_cdk::update]
pub async fn mint_nft(metadata: Vec<SetNFTItemRequest>) -> Result<SetResult, MintError> {
    if !is_registered(ic_cdk::api::caller()) {
        ic_cdk::trap("No user found for minting NFT");
    }
    ic_cdk::println!("Minting NFT");
    initialized().await;
    let principal = LEDGERID
        .with(|s| s.borrow().as_ref().map(|c| c.canister_ledger_nft.clone()))
        .expect("Ledger canister ID not set");
    let ledger_principal = Principal::from_text(principal).expect("Invalid ledger canister ID");
    let (response,): (SetResult,) = ic_cdk::call(
        ledger_principal,
        "icrcX_mint",
        (metadata,),
    )
    .await
    .map_err(|e| MintError::GenericError {
        error_code: 500u128,
        message: format!("{:?}", e),
    })?;
    Ok(response)

}

async fn initialized() {
        let principal = LEDGERID
        .with(|s| s.borrow().as_ref().map(|c| c.canister_ledger_nft.clone()))
        .expect("Ledger canister ID not set");
    let ledger_principal = Principal::from_text(principal).expect("Invalid ledger canister ID");
    let _: () = ic_cdk::call(
        ledger_principal,
        "init",
        (),
    ).await.expect("Failed to call init on ledger canister");
}

#[init]
fn init(args: Option<IndexArgs>) {
    match args {
        Some(IndexArgs::Init(init_args)) => {
            LEDGERID.with(|s| *s.borrow_mut() = Some(init_args.clone()));
            ic_cdk::println!(
                "✅ Init with token ledger: {} and NFT ledger: {}",
                init_args.canister_ledger_token,
                init_args.canister_ledger_nft
            );
        }
        Some(IndexArgs::Upgrade(upgrade_args)) => {
            LEDGERID.with(|s| {
                let mut current = s.borrow_mut();
                let mut cfg = current.clone().unwrap_or(InitArgs {
                    canister_ledger_token: "".to_string(),
                    canister_ledger_nft: "".to_string(),
                });

                if let Some(new_token) = upgrade_args.canister_ledger_token {
                    cfg.canister_ledger_token = new_token.clone();
                    ic_cdk::println!("🔄 Updated token ledger canister -> {}", new_token);
                }
                if let Some(new_nft) = upgrade_args.canister_ledger_nft {
                    cfg.canister_ledger_nft = new_nft.clone();
                    ic_cdk::println!("🔄 Updated NFT ledger canister -> {}", new_nft);
                }

                *current = Some(cfg);
            });
        }
        None => {
            ic_cdk::println!("⚠️ Init called without args — skipping (maybe restored state).");
        }
    }
}
