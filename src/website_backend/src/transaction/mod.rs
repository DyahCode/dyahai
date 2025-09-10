use candid::Principal;
use ic_ledger_types::{
    AccountIdentifier, GetBlocksArgs, Memo, Operation, QueryBlocksResponse,Tokens,AccountBalanceArgs,TransferArgs, TransferResult,DEFAULT_FEE,
};
use serde_json::to_string;
use std::any::Any;
pub mod types;
pub use types::*;

pub async fn check_canisters_balance(principal : Principal) -> Result<Tokens, String> {
    let account = AccountIdentifier::new(&principal, &ic_ledger_types::DEFAULT_SUBACCOUNT);

    let args = AccountBalanceArgs { account };

    let (response,): (Tokens,) = ic_cdk::call(
        Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").expect("Invalid canister ID"),
        "account_balance",
        (args,),
    )
    .await
    .map_err(|e| format!("Failed for calling ledger: {:?}", e))?;

    Ok(response)
}
pub async fn transfer_to_client(principal : Principal) -> Result<TransferResult, String> {
    let account = AccountIdentifier::new(&principal, &ic_ledger_types::DEFAULT_SUBACCOUNT);

    let args = &TransferArgs {
       memo: Memo(0),
       amount: Tokens::from_e8s(2_110_000),
       fee: DEFAULT_FEE,
       from_subaccount: None,
       to:account,
       created_at_time: None,
     };

    let (response,): (TransferResult,) = ic_cdk::call(
        Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").expect("Invalid canister ID"),
        "transfer",
        (args,),
    )
    .await
    .map_err(|e| format!("Failed for calling ledger: {:?}", e))?;

    Ok(response)
}

pub async fn get_parsed_transaction(block_height: u64,message : String) -> Result<ParsedTransaction, String> {
    ic_cdk::println!(
        "Fetching block at height: {} and type {:?}",
        block_height,
        block_height.type_id()
    );
    let args = GetBlocksArgs {
        start: block_height,
        length: 10,
    };

    let (response,): (QueryBlocksResponse,) = ic_cdk::call(
        Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").expect("Invalid canister ID"),
        "query_blocks",
        (args,),
    )
    .await
    .map_err(|e| format!("Failed for calling ledger: {:?}", e))?;

    let block = response
        .blocks
        .get(0)
        .ok_or(format!("Block height {} tidak ditemukan", block_height))?;

    let tx = &block.transaction;

    let (from, to, amount) = match &tx.operation {
        Some(Operation::Transfer {
            from, to, amount, ..
        }) => (Some(*from), Some(*to), Some(*amount)),
        _ => (None, None, None), // Jika bukan transfer
    };

    let parsed = ParsedTransaction {
        from,
        to,
        amount,
        memo: Some(tx.memo.clone()),
        message : Some(message),
        timestamp: block.timestamp,
    };

    Ok(parsed)
}

pub fn save_trx(principal: Principal, blockresult : ParsedTransaction) {
    ic_cdk::println!("Saving block result...");
    TRX_STORE.with(|store| {
        store
            .borrow_mut()
            .entry(principal)
            .or_insert_with(Vec::new)
            .push(blockresult);
    });
    ic_cdk::println!("Block result has been saved.");
}

pub fn retrieve_trx(principal: Principal) -> Vec<String> {
    TRX_STORE.with(|store| {
        let store_ref = store.borrow();
        match store_ref.get(&principal) {
            Some(blockresult) => {
                ic_cdk::println!(
                    "Block result found, total Block: {}",
                    blockresult.len()
                );
                blockresult
                    .iter()
                    .map(|trx| to_string(trx).unwrap_or_else(|_| "{}".to_string()))
                    .collect()
            }
            None => {
                ic_cdk::println!(
                    "No transaction found for principal: {}",
                    principal
                );
                vec![]
            }
        }
    })
}


