import { useState, useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import Navbar from "../components/layout/Navbar";
import { Box, Container } from "../components/layout/Container";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { Principal } from "@dfinity/principal";
import {
  idlFactory,
  canisterId,
} from "../../../declarations/dyahai_token_index";
import { CreateAnonAgent, CreateActor } from "ic-auth";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";

const BlockExplorerPage = () => {
  const { credit, principalId, Login, isLoggedIn, Logout, tier } = useAuth();

  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [numBlock, setnumBlock] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");

  const [searchHash, setSearchHash] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchHash.trim() !== "") {
      navigate(`/dyascan?hash=${searchHash}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trx = await fetchTransactions();
        const params = new URLSearchParams(location.search);

        const Hash = params.get("hash");

        if (Hash) {
          const trxhash = trx.find((tx) => String(tx.parentHash) === Hash);
          setTransaction(trxhash);
          return;
        }
        const DescTrx = Array.from(trx).reverse();
        setTransactions(DescTrx);
      } catch (err) {
        console.error("Error fetch transactions", err);
        setTransactions([]);
      }
    };
    fetchData();
  }, [location]);

  async function fetchTransactions() {
    const host =
      process.env.DFX_NETWORK === "ic"
        ? "https://icp0.io"
        : "http://localhost:5000";

    const anonimAgent = await CreateAnonAgent(host);
    const actor = await CreateActor(anonimAgent, idlFactory, canisterId);
    const length = await numBlocks(actor);
    const trx = await fetchBlockData(actor, 0, length);
    return trx;
  }

  async function numBlocks(actor) {
    const length = await actor.status();
    const result = Number(length.num_blocks_synced);
    setnumBlock(result);
    return result;
  }

  async function fetchBlockData(actor, block, length) {
    let args = {
      start: BigInt(block),
      length: BigInt(length),
    };
    const data = await actor.get_blocks(args);
    return parseLedgerBlocks(data);
  }

  function parseLedgerBlocks(data) {
    const decoder = new TextDecoder();

    const opMap = {
      xfer: "transfer",
      mint: "mint",
      burn: "burn",
    };

    function decodeHash(blobObj) {
      if (!blobObj || !blobObj.Blob) return null;
      const bytes = Object.values(blobObj.Blob);
      return Buffer.from(bytes).toString("hex");
    }
    function decodeBlob(blobObj) {
      if (!blobObj || !blobObj.Blob) return null;
      const bytes = Object.values(blobObj.Blob);
      return decoder.decode(new Uint8Array(bytes));
    }

    function decodeAddress(arr) {
      if (!arr || !Array.isArray(arr)) return null;
      const blob = arr[0]?.Blob;
      if (!blob) return null;
      return Principal.fromUint8Array(blob).toString();
    }
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
  }

  function timeAgo(date) {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 5) return "just now";
    if (diffInSeconds < 60)
      return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  function shorten(str, front = 10, back = 10) {
    if (!str) return "";
    return str.length > front + back
      ? `${str.slice(0, front)}...${str.slice(-back)}`
      : str;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Navbar
        navbarStyle="secondary"
        principalId={principalId}
        isLoggedIn={isLoggedIn}
        credit={credit}
        Login={Login}
        Logout={Logout}
        tier={tier}
      />
      <Container className="flex flex-col items-center my-[10dvh] space-y-20 text-white">
        {hash ? (
          <Box className="">
            <div className="w-full h-16 flex justify-center items-center">
              <h2 className="font-semibold">Block Info</h2>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <div className="w-full p-2 text-sm bg-secondaryColor border border-borderShade/35 rounded-xl">
                <div className="flex items-center p-3">
                  <p className="w-32 text-lg font-medium">Block Index</p>
                  <p>: {transaction.blockIndex}</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">Hash</p>
                  <p>: {transaction.parentHash}</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">Type</p>
                  <p>: {transaction.operation}</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">From</p>
                  <p>: {transaction.from}</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">To</p>
                  <p>: {transaction.to}</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">Amount</p>
                  <p>: {transaction.amount} DYA</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">Fee</p>
                  <p>: {transaction.fee} DYA</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">Memo</p>
                  <p>: {transaction.memo}</p>
                </div>
                <div className="flex items-center px-3 pb-3">
                  <p className="w-32 text-lg font-medium">Timestamp</p>
                  <p>: {transaction.txTimestamp}</p>
                </div>
              </div>
            </div>
          </Box>
        ) : (
          <>
            <Box className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 border-2 border-black">
              <div className="flex justify-center items-center h-20 bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2 p-4">
                <div className="w-[10%]  h-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M8 3a4.99 4.99 0 0 1 4 2c.628.836 1 1.875 1 3a4.98 4.98 0 0 1-.999 3H12a5 5 0 0 1-4 2a5 5 0 0 1-4-1.999V11a5 5 0 0 1 4-8m.948 8H7.052c.277.626.623 1 .948 1s.67-.374.948-1M6 11l-.645.001q.413.364.914.606A6 6 0 0 1 6 11.001m4.645.001H10a6 6 0 0 1-.269.606q.501-.242.914-.606m-5.133-2.5H4.031a4 4 0 0 0 .505 1.5h1.172a9 9 0 0 1-.196-1.5m3.975 0H6.513c.03.544.104 1.05.21 1.5h2.553c.107-.45.182-.956.21-1.5m2.482 0h-1.481a9 9 0 0 1-.196 1.5h1.172a4 4 0 0 0 .505-1.5M5.708 6H4.535c-.261.452-.437.96-.504 1.5h1.481A9 9 0 0 1 5.708 6m3.568 0H6.724a8.4 8.4 0 0 0-.21 1.499h2.973a8.5 8.5 0 0 0-.21-1.5M11.465 6h-1.173c.102.467.17.972.196 1.5h1.481a4 4 0 0 0-.504-1.5M6.269 4.393l-.124.062q-.43.226-.79.545H6a6 6 0 0 1 .269-.607M8 4c-.326 0-.671.375-.948 1h1.896C8.671 4.376 8.326 4 8 4m1.73.393l.038.071q.125.252.232.536h.646a4 4 0 0 0-.915-.607"
                    />
                  </svg>
                </div>
                <div className="flex w-[90%] flex-col h-full justify-center items-start">
                  <h2 className="font-semibold text-sm">DYA Rate</h2>
                  <p className="font-medium text-sm flex gap-2">0.0187 ICP</p>
                </div>
              </div>
              <div className="flex justify-center items-center h-20 bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2 p-4">
                <div className="w-[10%]  h-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M5.948 1.5h12.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.725c.456.456.642 1.023.726 1.65c.08.595.08 1.345.08 2.243v.104c0 .898 0 1.648-.08 2.242c-.084.628-.27 1.195-.726 1.65c-.455.456-1.022.642-1.65.726c-.594.08-1.343.08-2.242.08H5.948c-.898 0-1.648 0-2.242-.08c-.628-.084-1.195-.27-1.65-.726c-.456-.455-.642-1.022-.726-1.65c-.08-.594-.08-1.344-.08-2.242v-.104c0-.898 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726C4.3 1.5 5.05 1.5 5.949 1.5M3.905 3.067c-.461.062-.659.169-.789.3s-.237.327-.3.788c-.064.483-.066 1.131-.066 2.095s.002 1.612.067 2.095c.062.461.169.659.3.789s.327.237.788.3C4.388 9.497 5.036 9.5 6 9.5h12c.964 0 1.612-.002 2.095-.067c.461-.062.659-.169.789-.3s.237-.327.3-.788c.064-.483.066-1.131.066-2.095s-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789s-.327-.237-.788-.3C19.612 3.003 18.964 3 18 3H6c-.964 0-1.612.002-2.095.067M5.25 6.25A.75.75 0 0 1 6 5.5h2A.75.75 0 1 1 8 7H6a.75.75 0 0 1-.75-.75m5 0A.75.75 0 0 1 11 5.5h7A.75.75 0 0 1 18 7h-7a.75.75 0 0 1-.75-.75M5.948 12.5h12.104c.899 0 1.648 0 2.242.08c.628.084 1.195.27 1.65.726c.456.455.642 1.022.726 1.65c.08.594.08 1.343.08 2.242v.104c0 .899 0 1.648-.08 2.242c-.084.628-.27 1.195-.726 1.65c-.455.456-1.022.642-1.65.726c-.594.08-1.343.08-2.242.08H5.948c-.898 0-1.648 0-2.242-.08c-.628-.084-1.195-.27-1.65-.726c-.456-.455-.642-1.022-.726-1.65c-.08-.594-.08-1.343-.08-2.242v-.104c0-.899 0-1.648.08-2.242c.084-.628.27-1.195.725-1.65c.456-.456 1.023-.642 1.65-.726c.595-.08 1.345-.08 2.243-.08m-2.043 1.566c-.461.063-.659.17-.789.3s-.237.328-.3.79c-.064.482-.066 1.13-.066 2.094s.002 1.612.067 2.095c.062.461.169.659.3.789s.327.237.788.3c.483.064 1.131.066 2.095.066h12c.964 0 1.612-.002 2.095-.067c.461-.062.659-.169.789-.3s.237-.327.3-.788c.064-.483.066-1.131.066-2.095s-.002-1.612-.067-2.095c-.062-.461-.169-.659-.3-.789s-.327-.237-.788-.3C19.612 14.003 18.964 14 18 14H6c-.964 0-1.612.002-2.095.066M5.25 17.25A.75.75 0 0 1 6 16.5h2A.75.75 0 0 1 8 18H6a.75.75 0 0 1-.75-.75m5 0a.75.75 0 0 1 .75-.75h7a.75.75 0 0 1 0 1.5h-7a.75.75 0 0 1-.75-.75"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex w-[50%] flex-col  h-full justify-center items-start">
                  <h2 className="font-semibold text-sm">TRANSACTIONS</h2>
                  <p className="font-medium text-sm flex gap-2">{numBlock}</p>
                </div>
                <div className="flex w-[40%] flex-col h-full justify-center items-end pr-2">
                  <h2 className="font-semibold text-sm">FEE</h2>
                  <p className="font-medium text-sm flex gap-2">0.0001 DYA</p>
                </div>
              </div>
              <div className="flex justify-center items-center h-20 bg-secondaryColor border border-borderShade/35 rounded-xl gap-2 p-4">
                <div className="w-[10%]  h-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M8 3a4.99 4.99 0 0 1 4 2c.628.836 1 1.875 1 3a4.98 4.98 0 0 1-.999 3H12a5 5 0 0 1-4 2a5 5 0 0 1-4-1.999V11a5 5 0 0 1 4-8m.948 8H7.052c.277.626.623 1 .948 1s.67-.374.948-1M6 11l-.645.001q.413.364.914.606A6 6 0 0 1 6 11.001m4.645.001H10a6 6 0 0 1-.269.606q.501-.242.914-.606m-5.133-2.5H4.031a4 4 0 0 0 .505 1.5h1.172a9 9 0 0 1-.196-1.5m3.975 0H6.513c.03.544.104 1.05.21 1.5h2.553c.107-.45.182-.956.21-1.5m2.482 0h-1.481a9 9 0 0 1-.196 1.5h1.172a4 4 0 0 0 .505-1.5M5.708 6H4.535c-.261.452-.437.96-.504 1.5h1.481A9 9 0 0 1 5.708 6m3.568 0H6.724a8.4 8.4 0 0 0-.21 1.499h2.973a8.5 8.5 0 0 0-.21-1.5M11.465 6h-1.173c.102.467.17.972.196 1.5h1.481a4 4 0 0 0-.504-1.5M6.269 4.393l-.124.062q-.43.226-.79.545H6a6 6 0 0 1 .269-.607M8 4c-.326 0-.671.375-.948 1h1.896C8.671 4.376 8.326 4 8 4m1.73.393l.038.071q.125.252.232.536h.646a4 4 0 0 0-.915-.607"
                    />
                  </svg>
                </div>
                <div className="flex w-[90%] flex-col  h-full justify-center items-start">
                  <h2 className="font-semibold text-sm">DYA MARKET CAP</h2>
                  <p className="font-medium text-sm flex gap-2">Coming Soon</p>
                </div>
              </div>
              <div className="flex justify-center items-center h-20 bg-secondaryColor border border-borderShade/35 rounded-xl gap-2 p-4">
                <div className="w-[10%]  h-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                      <path
                        fill="currentColor"
                        d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16m0 2a1 1 0 0 1 .993.883L13 7v4.586l2.707 2.707a1 1 0 0 1-1.32 1.497l-.094-.083l-3-3a1 1 0 0 1-.284-.576L11 12V7a1 1 0 0 1 1-1"
                      />
                    </g>
                  </svg>
                </div>
                <div className="flex w-full flex-col  h-full justify-center items-start">
                  <h2 className="font-semibold text-sm">LATEST BLOCK</h2>
                  <p className="font-medium text-sm flex gap-2">
                    {numBlock - 1}
                  </p>
                </div>
              </div>
            </Box>
            <div className="w-full">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 w-full"
              >
                <input
                  type="text"
                  placeholder="Find Hash"
                  value={searchHash}
                  onChange={(e) => setSearchHash(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm h-11 text-black outline-none w-full"
                />

                <Button
                  type="submit"
                  className="rounded-md hover:shadow-none hover:bg-accentColor/50"
                >
                  Find
                </Button>
              </form>
            </div>
            <div className="w-full flex gap-4 text-white">
              <Box className="w-full">
                <div className="w-full h-16 flex justify-start  items-center">
                  <h2 className="font-semibold">Latest Transaction</h2>
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-2">
                  {currentTransactions.map((tx, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-col md:flex-row justify-between p-4 text-sm items-center bg-secondaryColor border border-borderShade/35 rounded-xl gap-2 md:gap-0"
                    >
                      <div className="flex md:w-[55%] w-full justify-start items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                        >
                          <path
                            fill="currentColor"
                            d="m31.42 9.09l-13-6a1 1 0 0 0-.84 0l-13 6A1 1 0 0 0 4 10v17a1 1 0 0 0 .58.91l13 6a1 1 0 0 0 .84 0l13-6A1 1 0 0 0 32 27V10a1 1 0 0 0-.58-.91M18 5.1L28.61 10L18 14.9L7.39 10ZM6 11.56l11 5.08v14.8L6 26.36Zm13 19.88v-14.8l11-5.08v14.8Z"
                          />
                          <path fill="none" d="M0 0h36v36H0z" />
                        </svg>
                        <div className="min-w-0">
                          {" "}
                          <div
                            className="cursor-pointer text-blue-600 underline truncate pr-2"
                            onClick={() =>
                              navigate(`/dyascan?hash=${tx.parentHash}`)
                            }
                          >
                            {tx.parentHash}
                          </div>
                          <span className="text-gray-600">
                            {timeAgo(tx.timestamp)}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full flex-col md:w-[25%] justify-center items-start">
                        <p className="text-left">
                          From:{" "}
                          <span className="text-gray-600">
                            {shorten(tx.from)}
                          </span>
                        </p>
                        <p className="text-left">
                          To:{" "}
                          <span className="text-gray-600">
                            {shorten(tx.to)}
                          </span>
                        </p>
                      </div>
                      <div className="flex w-full md:w-[20%] justify-start md:justify-end items-center text-[12px]">
                        <p className="border-[1px] flex justify-center items-center border-gray-400 rounded-md p-1">
                          {tx.amount} DYA
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-8 px-3 flex justify-center items-center rounded-md border disabled:opacity-50 disabled:bg-primaryColor hover:bg-accentColor cursor-pointer"
                    >
                      Prev
                    </button>
                    {totalPages <= 4 ? (
                      Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => goToPage(i + 1)}
                          className={`h-8 flex justify-center items-center aspect-square rounded-md border ${
                            currentPage === i + 1
                              ? "bg-accentColor text-white"
                              : ""
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))
                    ) : (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className={`h-8 flex justify-center items-center aspect-square rounded-md border ${
                            currentPage === 1 ? "bg-accentColor text-white" : ""
                          }`}
                        >
                          1
                        </button>

                        {currentPage > 3 && <span className="px-2">...</span>}

                        {/* middle pages */}
                        {Array.from(
                          {
                            length: Math.min(
                              3,
                              totalPages - 2 
                            ),
                          },
                          (_, i) => {
                            const page = Math.max(2, currentPage - 1) + i;
                            if (page >= totalPages) return null;
                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`h-8 flex justify-center items-center aspect-square rounded-md border ${
                                  currentPage === page
                                    ? "bg-accentColor text-white"
                                    : ""
                                }`}
                              >
                                {page}
                              </button>
                            );
                          }
                        )}

                        {currentPage < totalPages - 2 && (
                          <span className="px-2">...</span>
                        )}

                        {/* always show last page */}
                        <button
                          onClick={() => goToPage(totalPages)}
                          className={`h-8 flex justify-center items-center aspect-square rounded-md border ${
                            currentPage === totalPages
                              ? "bg-accentColor text-white"
                              : ""
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    {/* Next */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-8 px-3 flex justify-center items-center rounded-md border bg-primaryColor disabled:opacity-50 cursor-pointer hover:bg-accentColor disabled:bg-primaryColor"
                    >
                      Next
                    </button>
                  </div>

                </div>
              </Box>
            </div>
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default BlockExplorerPage;
