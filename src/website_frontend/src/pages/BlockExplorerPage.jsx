import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeadSection from "../components/layout/HeadSection";
import Footer from "../components/layout/Footer";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";


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

  // INJECT USEEFFECT
  // INJECT USEEFFECT
  // INJECT USEEFFECT
  // helper untuk generate random hex 64 panjang
  let hashCounter = 0;
  const randomHash = () => {
    hashCounter++;
    return hashCounter.toString(16).padStart(64, "0");
  };
  // const randomHash = () =>
  //   Array.from({ length: 64 }, () =>
  //     Math.floor(Math.random() * 16).toString(16)
  //   ).join("");

  // helper untuk generate ICP-like address
  const randomAddress = () => {
    const charset = "abcdefghijklmnopqrstuvwxyz234567";
    let str = "";
    for (let i = 0; i < 55; i++) {
      str += charset[Math.floor(Math.random() * charset.length)];
    }
    // sisipkan tanda "-" tiap 5–6 char biar mirip ICP
    return str.match(/.{1,5}/g).join("-");
  };

  React.useEffect(() => {
    GenerateDummy();
  }, []);

  const GenerateDummy = () => {
    const dummyData = [];
    for (let i = 300; i >= 1; i--) {
      dummyData.push({
        blockIndex: i,
        parentHash: randomHash(),
        operation: i % 3 === 0 ? "burn" : i % 3 === 1 ? "transfer" : "mint",
        from: i % 3 === 0 ? randomAddress() : "Minting Account",
        to: i % 3 === 0 ? "Minting Account" : randomAddress(),
        amount: `${Math.floor(Math.random() * 10) + 1} DYA`,
        fee: i % 3 === 1 ? "0.0001 DYA" : "0 DYA",
        memo:
          i % 3 === 0
            ? `Burned token #${i}`
            : i % 3 === 1
              ? `Transfer token #${i}`
              : `Minted reward token #${i}`,
        txTimestamp: new Date(
          Date.now() - i * 60000
        ).toString(), // mundur 1 menit tiap block
      });
    }
    setAllTransactions(dummyData);
    return dummyData;
  }

  useEffect(() => {
    if (allTransactions !== null) {
      console.log('allTransactions :>> ', allTransactions);
    }
  }, [allTransactions])
  // INJECT USEEFFECT
  // INJECT USEEFFECT
  // INJECT USEEFFECT



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

      // kalau data dummy belum ada, generate dulu
      let currentData = allTransactions;
      if (currentData.length === 0) {
        console.error("allTransactions = 0");
        currentData = await GenerateDummy(); // ⬅️ karena sekarang return array
      }

      // cari transaksi sesuai hash
      const found = currentData.find(
        (tx) => String(tx.parentHash) === String(transactionHash)
      );
      console.log('Data ada :>> ', found);
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




  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Navbar navbarStyle="secondary" />

      {/* Outlet for changing sub for BlockExplore and BlockDetail */}

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