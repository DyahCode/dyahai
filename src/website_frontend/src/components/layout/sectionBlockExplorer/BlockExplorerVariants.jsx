export const OperationType = ({ type }) => {
  switch (type) {
    case "burn":
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="size-full fill-red-600">
        <path d="M143.38 17.85a8 8 0 0 0-12.63 3.41l-22 60.41l-24.16-23.41a8 8 0 0 0-11.93.89C51 87.53 40 116.08 40 144a88 88 0 0 0 176 0c0-59.45-50.79-108-72.62-126.15m40.51 135.49a57.6 57.6 0 0 1-46.56 46.55a7.7 7.7 0 0 1-1.33.11a8 8 0 0 1-1.32-15.89c16.57-2.79 30.63-16.85 33.44-33.45a8 8 0 0 1 15.78 2.68Z" />
      </svg>;
    case "transfer":
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-full fill-none stroke-sky-600 stroke-[4px] ">
        <path strokeLinecap="round" strokeLinejoin="round" d="M24 13.343v-2.325c0-2.391 2.588-3.886 4.659-2.69L41.947 16c2.07 1.195 2.07 4.184 0 5.38L28.66 29.052c-2.07 1.195-4.659-.3-4.659-2.69v-4.724c0-2.39-2.588-3.885-4.659-2.69L6.053 26.622c-2.07 1.195-2.07 4.184 0 5.38l13.288 7.671c2.07 1.196 4.659-.299 4.659-2.69v-2.325" />
      </svg>;
    case "mint":
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-full fill-emerald-700">
        <path d="M512 169.943c-50.296 12.033-91.653 12.632-127.443 7.49c-22.895 27.979-36.901 56.091-48.568 83.737c48.693-13.64 96.583-31.712 136.124-55.34c-42.697 31.493-92.067 53.554-141.817 69.276c-20.269 54.594-39.842 100.591-77.074 129.566c58.39-20.34 160.245-75.81 258.778-234.729m-263.637 219.67c80.103-69.55 48.78-188.267 203.384-290.824c-255.72-50.577-368.809 40.644-388.144 54.746c-103.994 75.841-56.637 198.26-24.04 169.647c53.276-46.09 133.296-158.44 286.56-198.737C186.999 162.294 88.86 295.126 63.094 328.528c-45.598 69.997 89.654 148.643 185.27 61.084" />
      </svg>;
  }
}


export const parseLedgerBlocks = (data) => {

  const opMap = {
    xfer: "transfer",
    mint: "mint",
    burn: "burn",
  };

  return (data.blocks || []).map((block, index) => {
    const map = Object.fromEntries(block.Map);

    const tx = Object.fromEntries(map.tx.Map);
    const txType = opMap[tx.op?.Text] || tx.op?.Text;
    const feeValue = map.fee?.Nat64 ?? tx.fee?.Nat64 ?? 0;
    return {
      blockIndex: index,
      fee: Number(feeValue) / 100_000_000,
      timestamp: new Date(Number(map.ts?.Nat64 || 0) / 1_000_000),
      parentHash: decodeHash(map.phash),
      amount: Number(tx.amt?.Nat64 || 0) / 100_000_000,
      from:
        txType == "mint" ? "Minting Account" : decodeAddress(tx.from?.Array),
      to: txType == "burn" ? "Minting Account" : decodeAddress(tx.to?.Array),
      memo: decodeBlob(tx.memo),
      operation: txType,
      txTimestamp: tx.ts?.Nat64
        ? new Date(Number(tx.ts?.Nat64) / 1_000_000).toString()
        : null,
    };
  });
};

const decodeHash = (blobObj) => {
  if (!blobObj || !blobObj.Blob) return null;
  const bytes = Object.values(blobObj.Blob);
  return Buffer.from(bytes).toString("hex");
}

const decodeBlob = (blobObj) => {
  const decoder = new TextDecoder();

  if (!blobObj || !blobObj.Blob) return null;
  const bytes = Object.values(blobObj.Blob);
  return decoder.decode(new Uint8Array(bytes));
}

const decodeAddress = (arr) => {
  if (!arr || !Array.isArray(arr)) return null;
  const blob = arr[0]?.Blob;
  if (!blob) return null;
  return Principal.fromUint8Array(blob).toString();
}