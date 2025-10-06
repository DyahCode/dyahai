#!/usr/bin/env bash
set -euo pipefail

dfx start --clean --background --host 127.0.0.1:5000
sleep 5

dfx canister create website_backend
CANISTER_BACKEND=$(dfx canister id website_backend)
dfx canister create dyahai_token
CANISTER_TOKEN=$(dfx canister id dyahai_token)

IDENTITY=$(dfx identity get-principal)

LOGO_BASE64=$(cat logo.txt)

dfx deploy internet_identity

cat > init-args-nft.did <<EOF
(
  record {
    icrc3_args = opt record {
      maxRecordsToArchive = 4_000 : nat;
      archiveIndexType = variant { Stable };
      maxArchivePages = 62_500 : nat;
      settleToRecords = 2_000 : nat;
      archiveCycles = 2_000_000_000_000 : nat;
      maxActiveRecords = 4_000 : nat;
      maxRecordsInArchiveInstance = 5_000_000 : nat;
      archiveControllers = null;
      supportedBlocks = vec {};
    };
    icrc37_args = opt record {
      deployer = principal "$CANISTER_BACKEND";
      max_approvals = opt (100 : nat);
      max_approvals_per_token_or_collection = opt (10 : nat);
      settle_to_approvals = null;
      max_revoke_approvals = null;
      collection_approval_requires_token = opt true;
    };
    icrc7_args = opt record {
      deployer = principal "$CANISTER_BACKEND";
      allow_transfers = opt true;
      supply_cap = null;
      tx_window = null;
      burn_account = null;
      default_take_value = opt (1_000 : nat);
      logo = opt "https://hvfji-caaaa-aaaau-abx7q-cai.icp0.io/assets/dya-18e7c22d.svg";
      permitted_drift = null;
      name = opt "DyahAI NFT";
      description = opt "A Collection of Generative Image by DyahAI";
      max_take_value = opt (10_000 : nat);
      max_update_batch_size = opt (100 : nat);
      max_query_batch_size = opt (100 : nat);
      max_memo_size = opt (512 : nat);
      supported_standards = null;
      symbol = opt "DNFT";
    };
  },
)
EOF

dfx deploy nft --argument-file init-args-nft.did

CANISTER_NFT=$(dfx canister id nft)

dfx deploy website_backend --argument "(opt variant { Init = record { canister_ledger_token = \"$CANISTER_TOKEN\"; canister_ledger_nft = \"$CANISTER_NFT\"; } })"

cat > init-args.did <<EOF
(
  variant {
    Init = record {
      decimals = opt (8 : nat8);
      token_symbol = "DYA";
      transfer_fee = 10_000 : nat;
      metadata = vec {
        record {
          "icrc1:logo";
          variant {
            Text = "$LOGO_BASE64"
          };
        };
      };
      minting_account = record {
        owner = principal "$IDENTITY";
        subaccount = null;
      };
      initial_balances = vec {
        record {
          record {
            owner = principal "$CANISTER_BACKEND";
            subaccount = null;
          };
          10_000_000_000_299_890_000 : nat;
        };
      };
      fee_collector_account = null;
      archive_options = record {
        num_blocks_to_archive = 0 : nat64;
        max_transactions_per_response = null;
        trigger_threshold = 2_000 : nat64;
        more_controller_ids = null;
        max_message_size_bytes = null;
        cycles_for_archive_creation = null;
        node_max_memory_size_bytes = null;
        controller_id = principal "$IDENTITY";
      };
      max_memo_length = null;
      token_name = "Dyah AI";
      feature_flags = null;
    }
  },
)
EOF

dfx deploy dyahai_token --argument-file init-args.did

cat > init-args-index.did <<EOF
(opt variant { Init = record { ledger_id = principal "$CANISTER_TOKEN"; retrieve_blocks_from_ledger_interval_seconds = opt 10; } })
EOF

dfx deploy dyahai_token_index --argument-file init-args-index.did
CANISTER_TOKEN_INDEX=$(dfx canister id dyahai_token_index)

sed -i '/^MINTER_PRINCIPAL_ID=/d' .env 2>/dev/null || true
sed -i "1iMINTER_PRINCIPAL_ID='$IDENTITY'" .env

dfx deploy website_frontend
CANISTER_FRONTEND=$(dfx canister id website_frontend)

rm -f init-args.did init-args-index.did init-args-nft.did

echo "Backend Canister ID : $CANISTER_BACKEND"
echo "Frontend Canister ID: $CANISTER_FRONTEND"
echo "Token Canister ID   : $CANISTER_TOKEN"
echo "Nft Canister ID     : $CANISTER_NFT"
echo "Token Index Canister: $CANISTER_TOKEN_INDEX"
echo "Identity Principal  : $IDENTITY"
