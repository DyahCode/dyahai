use candid::Nat;
use candid::Principal;
pub use icrc_ledger_types::icrc1::{
    account::{Account, DEFAULT_SUBACCOUNT},
    transfer::{BlockIndex, Memo, TransferArg, TransferError},
};
pub mod types;
pub use types::*;

pub async fn transfer_token(args: TransferArg) -> Result<BlockIndex, TransferError> {
    let principal = LEDGERID
        .with(|s| s.borrow().as_ref().map(|c| c.canister_ledger.clone()))
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
