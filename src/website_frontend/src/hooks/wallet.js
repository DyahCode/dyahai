import { Principal } from "@dfinity/principal";
import { dyahai_token_index } from "../../../declarations/dyahai_token_index";
export const fetchBalance = async (authclient,retries = 3) => {
    const balance = await dyahai_token_index.icrc1_balance_of({
        owner: Principal.fromText(authclient.principal),
        subaccount: []
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
}
export const fetchTransaction = async (authclient) => {
    const transaction = await dyahai_token_index.get_account_transactions({
        account: {
            owner: Principal.fromText(authclient.principal),
            subaccount: []
        },
        start: [],
        max_results: BigInt(10),
    });
    return transaction;
}

export const BurnTokens = async (actorLedger) => {
    const message = "Burned 1 DYA to generate image";
    const encoder = new TextEncoder();
    const memoBlob = message ? [encoder.encode(message)] : [];
    const burn = await actorLedger.icrc1_transfer({
        from_subaccount: [],
        to: { owner: Principal.fromText(process.env.MINTER_PRINCIPAL_ID), subaccount: [] },
        fee: [],
        created_at_time: [BigInt(Date.now() * 1_000_000)],
        memo: memoBlob,
        amount: BigInt(100_000_000),
    })
    return burn;
}
export const TransferToken = async (actorLedger,receiver, userAmount) => {
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