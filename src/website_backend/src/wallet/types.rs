use candid::CandidType;
pub use icrc7_types::icrc7_types::Icrc7TokenMetadata;
use icrc_ledger_types::icrc1::account::Account;
use serde::Deserialize;
use serde::Serialize;
use std::cell::RefCell;

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct SetNFTItemRequest {
    pub created_at_time: Option<u64>,
    pub memo: Option<Vec<u8>>,
    pub metadata: NFTInput,
    pub r#override: bool,
    pub owner: Option<Account>,
    pub token_id: u128,
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub enum NFTInput {
    Map(Vec<(String, CandyShared)>),
    Class(Vec<PropertyShared>),
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub enum CandyShared {
    Array(Vec<CandyShared>),
    Class(Vec<PropertyShared>),
    Text(String),
    Nat(u128),
    Blob(Vec<u8>),
    Bool(bool),
    Map(Vec<(String, CandyShared)>),
}

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct PropertyShared {
    name: String,
    value: CandyShared,
    immutable: bool,
}
#[derive(CandidType, Deserialize, Clone)]
pub enum MintError {
    SupplyCapReached,
    Unauthorized,
    TokenIdAlreadyExist,
    TokenIdMinimumLimit,
    GenericError { error_code: u128, message: String },
    GenericBatchError { error_code: u128, message: String },
}

#[derive(CandidType, Deserialize, Clone)]
pub enum MintResult {
    Ok(Option<u128>),
    GenericError { error_code: u128, message: String },
    Err(MintError),
}

pub type SetResult = Vec<MintResult>;

#[derive(Clone, CandidType, Deserialize, Debug)]
pub struct InitArgs {
    pub canister_ledger_token: String,
    pub canister_ledger_nft: String,
}

#[derive(Clone, CandidType, Deserialize, Debug)]
pub struct UpgradeArgs {
    pub canister_ledger_token: Option<String>,
    pub canister_ledger_nft: Option<String>,
}

#[derive(Clone, CandidType, Deserialize, Debug)]
pub enum IndexArgs {
    Init(InitArgs),
    Upgrade(UpgradeArgs),
}

thread_local! {
    pub static LEDGERID: RefCell<Option<InitArgs>> = RefCell::new(None);
}

