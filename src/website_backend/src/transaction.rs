use ic_cdk::{  query, storage, update};
use std::cell::RefCell;
use std::collections::BTreeMap;
use candid::Principal;

use candid::{CandidType, Deserialize};
use ic_ledger_types::{
    AccountIdentifier, GetBlocksArgs, Memo, Operation, QueryBlocksResponse, Timestamp, Tokens,MAINNET_LEDGER_CANISTER_ID
};
use serde::Serialize;
use serde_json::to_string;
use std::any::Any;

#[derive(CandidType, Deserialize, Serialize, Debug, Clone)]
pub struct ParsedTransaction {
    pub from: Option<AccountIdentifier>,
    pub to: Option<AccountIdentifier>,
    pub amount: Option<Tokens>,
    pub memo: Option<Memo>,
    pub message : Option<String>,
    pub timestamp: Timestamp,
}

pub async fn get_parsed_transaction(block_height: u64,message : String) -> Result<ParsedTransaction, String> {
    ic_cdk::println!(
        "Fetching block at height: {} and type {:?}",
        block_height,
        block_height.type_id()
    );
    let args = GetBlocksArgs {
        start: block_height,
        length: 1,
    };

    let (response,): (QueryBlocksResponse,) = ic_cdk::call(
        // Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai")
             MAINNET_LEDGER_CANISTER_ID,
        "query_blocks",
        (args,),
    )
    .await
    .map_err(|e| format!("Gagal panggil ledger: {:?}", e))?;

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

type TRXStore = BTreeMap<Principal, Vec<ParsedTransaction>>;

thread_local! {
    static TRX_STORE: RefCell<TRXStore> = RefCell::default();
}

#[update]
pub fn save_trx(principal: Principal, blockresult : ParsedTransaction) {
    ic_cdk::println!("sedang menyimpan hasil Block");
    TRX_STORE.with(|store| {
        store
            .borrow_mut()
            .entry(principal)
            .or_insert_with(Vec::new)
            .push(blockresult);
    });
    ic_cdk::println!("Hasil Block telah disimpan");
}

#[query]
pub fn retrieve_trx(principal: Principal) -> Vec<String> {
    TRX_STORE.with(|store| {
        let store_ref = store.borrow();
        match store_ref.get(&principal) {
            Some(blockresult) => {
                ic_cdk::println!(
                    "✅ Block result ditemukan, jumlah Block: {}",
                    blockresult.len()
                );
                blockresult
                    .iter()
                    .map(|trx| to_string(trx).unwrap_or_else(|_| "{}".to_string()))
                    .collect()
            }
            None => {
                ic_cdk::println!(
                    "⚠️ Tidak ada transaksi ditemukan untuk principal: {}",
                    principal
                );
                vec![]
            }
        }
    })
}






pub fn trx_pre_upgrade() {
    TRX_STORE.with(|store| {
        storage::stable_save((store.borrow().clone(),)).unwrap();
    });
    ic_cdk::println!("Pre-upgrade: Data saved to stable memory.");
}

pub fn trx_post_upgrade() {
    let restored_store: Result<(TRXStore,), String> = storage::stable_restore();
    
    match restored_store {
        Ok((store,)) => {
            TRX_STORE.with(|blockresult| {
                *blockresult.borrow_mut() = store;
            });
            ic_cdk::println!("Post-upgrade: Data restored from stable memory.");
        }
        Err(e) => {
            ic_cdk::println!("Error restoring data from stable memory: {}", e);
        }
    }
}