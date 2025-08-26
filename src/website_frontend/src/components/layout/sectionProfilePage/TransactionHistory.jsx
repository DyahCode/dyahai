import React from "react";
import { useEffect, useState } from 'react';
import { useAuth } from "../../../provider/authProvider";

const TransactionHistory = () => {
  const { isLoggedIn, principalId, actor, loading } = useAuth();
  const [trx, setTrx] = useState([]);

  async function loadTrx() {
    try {
      const fetchedTrx = await actor.get_transaction();
      const ResultTrx = fetchedTrx.map((trx) => {
        return JSON.parse(trx)
      });
      setTrx(ResultTrx);
    } catch (error) {
    }
  }

  function numberArrayToHexString(numbers) {
    return numbers.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  const getMessageIcon = (message) => {
    if (message.includes("Added")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-full fill-yellow-600">
          <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m2.75 17.61v1.89a.75.75 0 0 1-1.5 0v-1.38a5.7 5.7 0 0 1-1.25.13h-.25v1.25a.75.75 0 0 1-1.5 0v-1.25H8.5a.75.75 0 0 1-.59-.25a.73.73 0 0 1-.13-.65l2-7.5a.74.74 0 0 1 1.44.38l-1.74 6.52H12a4.75 4.75 0 0 0 0-9.5H6.5a.75.75 0 0 1 0-1.5h3.75V4.5a.75.75 0 0 1 1.5 0v1.25H12a5.7 5.7 0 0 1 1.25.13V4.5a.75.75 0 0 1 1.5 0v1.89a6.25 6.25 0 0 1 0 11.22" />
        </svg>
      );
    }

    if (message.includes("Upgraded")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-full fill-accentColor">
          <path fillRule="evenodd" d="M7.245 2h9.51c1.159 0 1.738 0 2.206.163a3.05 3.05 0 0 1 1.881 1.936C21 4.581 21 5.177 21 6.37v14.004c0 .858-.985 1.314-1.608.744a.946.946 0 0 0-1.284 0l-.483.442a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0a1.657 1.657 0 0 0-2.25 0a1.657 1.657 0 0 1-2.25 0l-.483-.442a.946.946 0 0 0-1.284 0c-.623.57-1.608.114-1.608-.744V6.37c0-1.193 0-1.79.158-2.27c.3-.913.995-1.629 1.881-1.937C5.507 2 6.086 2 7.245 2M7 6.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 10.25a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5zM7 13.75a.75.75 0 0 0 0 1.5h.5a.75.75 0 0 0 0-1.5zm3.5 0a.75.75 0 0 0 0 1.5H17a.75.75 0 0 0 0-1.5z" clipRule="evenodd" />
        </svg>
      );
    }

    return null;
  };

  useEffect(() => {
    if (isLoggedIn && principalId && actor) {
      loadTrx();
    }
  }, [actor, isLoggedIn, principalId]);

  return (
    <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8">
      <p className="pb-2 pl-1 md:text-lg md:font-semibold text-neutral-300">
        Transaction History
      </p>
      <div className="flex border-separate flex-col gap-1 rounded-lg mt-4">

        {/* section header */}
        <div className="flex flex-col space-y-2 rounded-md border border-borderShade border-opacity-20 p-2">
          {loading ? (
            <div
              className="flex h-full w-full flex-col items-start justify-between rounded-lg border border-borderShade/40 overflow-hidden animate-pulse"
            >

              {/* Gambar */}
              <div className="flex flex-col items-center justify-center gap-3 size-full aspect-square bg-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-24 stroke-white opacity-10">
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round" >
                    <path d="M6.5 8a2 2 0 1 0 4 0a2 2 0 0 0-4 0m14.427 1.99c-6.61-.908-12.31 4-11.927 10.51" />
                    <path d="M3 13.066c2.78-.385 5.275.958 6.624 3.1" />
                    <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
                  </g>
                </svg>
              </div>

              {/* Informasi Bar Bawah */}
              <div className="flex h-[55px] w-full bg-white/10 items-center">

              </div>
            </div>
          ) : !trx.length ? (
            <div className="w-full flex flex-col items-center justify-center px-2 py-8 space-y-2">

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-12 fill-fontPrimaryColor/40 stroke-fontPrimaryColor/40 stroke-[1.5px]">
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0m-9-4.373v5.5m0 3.246v-.5" />
              </svg>
              <span className="text-fontPrimaryColor/70 text-sm text-center">No Transactions Available</span>

            </div>
          ) : (
            trx.map((trx, idx) => (
              <div key={idx} className="flex flex-row gap-2 rounded-md items-start md:items-center transition duration-200 border border-t-2 border-neutral-500/25 bg-white/[0.025] p-2 group text-fontPrimaryColor relative overflow-hidden">

                {/* KIRI: ICON */}
                <div className="h-6 md:h-14 aspect-square">
                  {getMessageIcon(trx.message)}
                </div>

                <div className="w-full flex flex-col lg:flex-row">
                  {/* TENGAH: To & Amount */}
                  <div className="flex-1 flex flex-col space-y-2">


                    <div className="w-fit border border-borderShade border-opacity-20 rounded-md px-1 bg-accentColor/[0.075]">
                      <span className="text-md tracking-wide text-fontPrimaryColor">
                        {trx.message}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 mt-1 text-fontPrimaryColor/40">
                      <div className="flex items-start text-sm gap-1">
                        <span className="w-fit border border-borderShade border-opacity-20 rounded-md px-1 bg-white/[0.025]">to :</span>
                        <span className="w-fit border border-borderShade border-opacity-20 rounded-md px-1 bg-white/[0.025] text-fontPrimaryColor/70 line-clamp-2 break-all">
                          {numberArrayToHexString(trx.to)}
                        </span>
                      </div>
                      <div className="flex items-start text-sm gap-1">
                        <span className="w-fit border border-borderShade border-opacity-20 rounded-md px-1 bg-white/[0.025]">Amount :</span>
                        <span className="w-fit flex flex-row items-center border border-borderShade border-opacity-20 rounded-md px-1 bg-white/[0.025] text-accentColor/70 font-bold">
                          {trx.amount.e8s / 100_000_000}<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5 ml-1">
                            <path fill="currentColor" d="M7 8.75a3.25 3.25 0 0 0 0 6.5c.935 0 1.71-.435 2.469-1.196a.75.75 0 0 1 1.063 1.058c-.92.923-2.054 1.638-3.532 1.638a4.75 4.75 0 1 1 0-9.5c1.376 0 2.457.621 3.342 1.454c.856.805 1.581 1.86 2.25 2.834l.026.037c.699 1.017 1.34 1.944 2.068 2.629c.709.667 1.44 1.046 2.314 1.046a3.25 3.25 0 0 0 0-6.5c-.935 0-1.71.435-2.469 1.196a.75.75 0 0 1-1.062-1.058C14.387 7.965 15.522 7.25 17 7.25a4.75 4.75 0 1 1 0 9.5c-1.376 0-2.457-.621-3.342-1.454c-.856-.805-1.581-1.86-2.25-2.834l-.026-.037c-.699-1.017-1.34-1.944-2.068-2.629C8.605 9.13 7.874 8.75 7 8.75" />
                          </svg>
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* KANAN: Memo & Timestamp */}
                  <div className="justify-end flex flex-col text-left lg:text-right text-xs text-white/40 font-mono pt-4 lg:pt-0">
                    <p className="">
                      {new Date(Number(trx.timestamp.timestamp_nanos / 1_000_000n)).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
