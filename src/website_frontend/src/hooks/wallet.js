import { Principal } from "@dfinity/principal";
import { dyahai_token_index } from "../../../declarations/dyahai_token_index";
import { nft } from "../../../declarations/nft";
export const fetchBalance = async (authclient, retries = 3) => {
  const balance = await dyahai_token_index.icrc1_balance_of({
    owner: Principal.fromText(authclient.principal),
    subaccount: [],
  });
  if (balance > 0) {
    const amountStr = balance.toString();
    const padded = amountStr.padStart(9, "0");
    const whole = padded.slice(0, -8) || "0";
    const fraction = padded.slice(-8);
    const fractionTrimmed = fraction.replace(/0+$/, "");
    return fractionTrimmed ? `${whole}.${fractionTrimmed}` : whole;
  } else if (retries > 0) {
    return fetchBalance(authclient, retries - 1);
  } else {
    return 0;
  }
};
export const fetchTransaction = async (authclient) => {
  const transaction = await dyahai_token_index.get_account_transactions({
    account: {
      owner: Principal.fromText(authclient.principal),
      subaccount: [],
    },
    start: [],
    max_results: BigInt(10),
  });
  return transaction;
};

export const BurnTokens = async (actorLedger) => {
  const message = "Burned 1 DYA to generate image";
  const encoder = new TextEncoder();
  const memoBlob = message ? [encoder.encode(message)] : [];
  const burn = await actorLedger.icrc1_transfer({
    from_subaccount: [],
    to: {
      owner: Principal.fromText(process.env.MINTER_PRINCIPAL_ID),
      subaccount: [],
    },
    fee: [],
    created_at_time: [BigInt(Date.now() * 1_000_000)],
    memo: memoBlob,
    amount: BigInt(100_000_000),
  });
  return burn;
};

export const TransferToken = async (actorLedger, receiver, userAmount) => {
  const [whole, fraction = ""] = userAmount.toString().split(".");

  const fractionPadded = (fraction + "00000000").slice(0, 8);

  const amountE8s = BigInt(whole + fractionPadded);

  console.log("User input:", userAmount, "=> e8s:", amountE8s.toString());

  const encoder = new TextEncoder();
  const memoBlob = message ? [encoder.encode(message)] : [];

  const transfer = await actorLedger.icrc1_transfer({
    from_subaccount: [],
    to: { owner: Principal.fromText(receiver), subaccount: [] },
    fee: [],
    created_at_time: [BigInt(Date.now() * 1_000_000)],
    memo: memoBlob,
    amount: amountE8s,
  });

  return transfer;
};

export const MintNft = async (Actor, principal, metadata) => {
  // contoh parameter metadata = {
  //   id: breymcamcalcm,
  //   name: "",
  //   description: "",
  //   url: "",
  //   mime: ""
  // }
  const index = await nft.icrc7_tokens([], []);
  const id = index.length ? BigInt(index[index.length - 1]) + 1n : 1n;

  const safeDescription =
    metadata.description && metadata.description.length > 0
      ? metadata.description
      : "No description";

  const mintArgs = [
    {
      token_id: id,
      owner: [
        {
          owner: Principal.fromText(principal),
          subaccount: [],
        },
      ],
      metadata: {
        Class: [
          {
            name: "icrc7:metadata:uri:image",
            value: {
              Text: metadata.url,
            },
            immutable: true,
          },
          {
            name: "icrc7:metadata:uri:name",
            value: {
              Text: metadata.name,
            },
            immutable: false,
          },
          {
            name: "icrc7:metadata:uri:description",
            value: {
              Text: safeDescription,
            },
            immutable: false,
          },
          {
            name: "icrc7:metadata:uri:mime",
            value: {
              Text: metadata.mime,
            },
            immutable: true,
          },
        ],
      },
      memo: [],
      override: false,
      created_at_time: [BigInt(Date.now() * 1_000_000)],
    },
  ];

  const result = await Actor.mint_nft(metadata.id, mintArgs);
  return result;
};

export const TransferNft = async (actorNft, receiver, tokenId) => {
  const transfer = await actorNft.icrc7_transfer([
    {
      to: {
        owner: Principal.fromText(receiver),
        subaccount: [],
      },
      token_id: BigInt(tokenId),
      memo: [],
      from_subaccount: [],
      created_at_time: [BigInt(Date.now() * 1_000_000)],
    },
  ]);

  return transfer;
};
export const BurnNft = async (actorNft, tokenId) => {
  const message = "Burn NFT ID:" + tokenId;
  const encoder = new TextEncoder();
  const memoBlob = message ? [encoder.encode(message)] : [];
  const burn = await actorNft.icrcX_burn({
    tokens: [BigInt(tokenId)],
    memo: memoBlob,
    created_at_time: [BigInt(Date.now() * 1_000_000)],
  });

  return burn;
};

export const fetchTrxCollections = async () => {
  const block = await nft.icrc3_get_blocks([]);
  if (block.log_length == 0n) {
    return {
      status: false,
    };
  }
  const trx = await nft.icrc3_get_blocks([
    {
      start: BigInt(0),
      length: block.log_length,
    },
  ]);
  return {
    status: true,
    data: trx,
  };
  
};

export const fetchAllCollections = async () => {
  const nfts = await nft.icrc7_tokens([], []);

  if (nfts.length == 0) {
    return {
      status: false,
    };
  }

  const metadataList = await Promise.all(
    nfts.map(async (tokenId) => {
      const [metadata] = await nft.icrc7_token_metadata([tokenId]);
      return {
        id: Number(tokenId),
        metadata,
      };
    })
  );

  return {
    status: true,
    metadata: metadataList,
  };
};
export const fetchUserCollections = async (authclient) => {
  const nfts = await nft.icrc7_tokens_of(
    {
      owner: Principal.fromText(authclient.principal),
      subaccount: [],
    },
    [],
    []
  );
  if (nfts.length == 0) {
    return {
      status: false,
    };
  }
  const metadataList = await Promise.all(
    nfts.map(async (tokenId) => {
      const [metadata] = await nft.icrc7_token_metadata([tokenId]);
      return {
        id: Number(tokenId),
        metadata,
      };
    })
  );

  return {
    status: true,
    metadata: metadataList,
  };
};
