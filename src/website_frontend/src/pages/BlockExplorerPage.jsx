import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory, canisterId } from "../../../declarations/dyahai_token_index";
import { Principal } from "@dfinity/principal";


const BlockExplorerPage = () => {

  const [allTransactions, setAllTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHashCopied, setSelectedHashCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [params] = useSearchParams();
  const location = useLocation();
  const transactionHash = params.get("hash") || location.pathname.split("/").pop();

  const itemsPerPage = 10;
  const totalPages = Math.ceil(allTransactions.length / itemsPerPage);

  const currentTransactions = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return allTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, allTransactions]);

  const timeAgo = (date) => {
    const now = new Date();
    const dateObj = new Date(date);
    const diff = Math.floor((now - dateObj) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = allTransactions.find(
      (tx) => tx.parentHash === searchQuery.trim()
    );
    setSelectedTransaction(found || null);
  };

  const handleCopyHash = async (hash) => {
    try {
      await navigator.clipboard.writeText(hash);
      setSelectedHashCopied(true);
      setTimeout(() => setSelectedHashCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  useEffect(() => {
    const loadTransaction = async () => {
      if (!transactionHash) {
        setSelectedTransaction(null);
        return;
      }

      let currentData = allTransactions;
      if (currentData.length === 0) {
        currentData = await fetchTransactions();
        setAllTransactions(currentData);
      }

      const found = currentData.find(
        (tx) => String(tx.parentHash) === String(transactionHash)
      );
      setSelectedTransaction(found);
    };

    if (location.state?.tx) {
      console.log("JALAN DARI STATE LINK")
      setSelectedTransaction(location.state.tx);
    } else {
      console.log("JALAN DARI ADDRESS ATAS")
      loadTransaction();
    }
  }, [transactionHash, location.state, allTransactions]);

  async function CreateAnonAgent(host) {
  const agent = HttpAgent.create({
    host: host,
    shouldFetchRootKey: process.env.DFX_NETWORK !== "ic",

  });
  return agent;
}

  async function fetchTransactions() {
    const host =
      process.env.DFX_NETWORK === "ic"
        ? "https://icp0.io"
        : "http://localhost:5000";

    const anonimAgent = await CreateAnonAgent(host);
    const actor = Actor.createActor(idlFactory, { agent: anonimAgent, canisterId: canisterId });
    const length = await numBlocks(actor);
    const trx = await fetchBlockData(actor, 0, length);
    return trx;
  }

  async function numBlocks(actor) {
    const length = await actor.status();
    const result = Number(length.num_blocks_synced);
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
      return bytes.map(b => b.toString(16).padStart(2, "0")).join("");
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
    }).reverse();
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Navbar navbarStyle="secondary" />


      <Outlet context={{
        allTransactions,
        selectedTransaction,
        setSelectedTransaction,
        currentPage,
        setCurrentPage,
        totalPages,
        handleSearch,
        searchQuery,
        setSearchQuery,
        handleCopyHash,
        selectedHashCopied,
        timeAgo,
      }} />


      <Footer />
    </div >
  );
};

export default BlockExplorerPage;