#!/usr/bin/env bash
set -euo pipefail

dfx start --clean --background --host 127.0.0.1:5000
sleep 5

dfx deploy website_backend
CANISTER_BACKEND=$(dfx canister id website_backend)

IDENTITY=$(dfx identity get-principal)

LOGO_BASE64=$(cat logo.txt)

cat > init-args.did <<EOF
(
  variant {
    Init = record {
      decimals = opt (8 : nat8);
      token_symbol = "DYA";
      transfer_fee = 10_000 : nat;
      metadata = vec {
        record { "icrc1:symbol"; variant { Text = "DYA" } };
        record { "icrc1:name"; variant { Text = "Dyah AI" } };
        record { "icrc1:decimals"; variant { Nat = 8 : nat } };
        record { "icrc1:fee"; variant { Nat = 10_000 : nat } };
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
          1_000_000_000_000_000_000 : nat;
        };
      };
      fee_collector_account = null;
      archive_options = record {
        num_blocks_to_archive = 100_000 : nat64;
        max_transactions_per_response = null;
        trigger_threshold = 90_000 : nat64;
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

dfx deploy dyah_token --argument-file init-args.did
CANISTER_TOKEN=$(dfx canister id dyah_token)

cat > init-args-index.did <<EOF
(opt variant { Init = record { ledger_id = principal "$CANISTER_TOKEN"; retrieve_blocks_from_ledger_interval_seconds = opt 10; } })
EOF

dfx deploy dyah_token_index --argument-file init-args-index.did
CANISTER_TOKEN_INDEX=$(dfx canister id dyah_token_index)

dfx deploy website_frontend
CANISTER_FRONTEND=$(dfx canister id website_frontend)

rm -f init-args.did init-args-index.did

echo "Backend Canister ID : $CANISTER_BACKEND"
echo "Frontend Canister ID: $CANISTER_FRONTEND"
echo "Token Canister ID   : $CANISTER_TOKEN"
echo "Token Index Canister: $CANISTER_TOKEN_INDEX"
echo "Identity Principal  : $IDENTITY"
