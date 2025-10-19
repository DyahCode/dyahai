import React from "react";
import { Link, useLocation, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { OperationType } from "./BlockExplorerVariants"
import { Container } from "../Container";
import HeadSection from "../HeadSection";


const BlockDetail = () => {
  const { allTransactions, timeAgo, handleCopyHash, selectedHashCopied, } = useOutletContext();
  const { hash } = useParams();
  const location = useLocation();
  let tx = location.state?.tx;

  if (!tx && allTransactions?.length) {
    tx = allTransactions.find((transaction) => transaction.parentHash === hash);
  }


  return (
    <>
      <HeadSection type="secondary">
        <div className="w-full flex border border-n-1/5 py-2 px-2 rounded-lg bg-secondaryColor items-center">
          <Link to="/block-explorer" className="flex space-x-1 items-center group w-8 h-8 p-2 bg-n-1/0 hover:bg-n-1/5 border border-n-1/10 rounded-md ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-none stroke-n-1/60 stroke-[2px] group-hover:stroke-n-1/100 duration-200 transition-all">
              <path d="M19.5 12h-15m0 0l5.625-6M4.5 12l5.625 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <div className="h-full w-fit ml-6 flex items-center justify-start">
            <Link to="/block-explorer" className="group h-fit text-n-1/70 hover:text-n-1 tagline text-left">
              <span>Ledger Block Explorer</span>
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 mx-2 fill-none stroke-n-1/60 stroke-[2px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18l6-6l-6-6"></path>
            </svg>
            <Link className="h-fit text-n-1/70 hover:text-n-1 tagline w-[16rem] truncate text-left">
              <span className="h-full text-ellipsis">{tx?.parentHash}</span>
            </Link>
          </div>
        </div>
        <h2 className="h2 font-semibold">Detail Transaction</h2>
        <span className="body-1 text-n-1/60">
          Every creation on DyahAI leaves a trace. Here, you can explore the full details of each transaction — from sender to receiver, timestamp to value. Transparency meets creativity, giving you a clear view of how ideas flow across the DyahAI blockchain. Dive in and see the story behind every block.
        </span>
      </HeadSection>

      <Container className="flex justify-center">

        <div className="w-full md:w-[80%] lg:w-[70%] border border-n-3/20 bg-n-1/2 h-fit rounded-xl px-10 py-16 mb-[10rem] transition-all duration-200 group z-5">
          {tx ? (
            <>
              <div
                className="flex flex-col space-y-4">
                <span className="w-fit border border-accentColor/20 bg-accentColor/10  body-2 text-n-1 px-2 py-0.5 mb-4 rounded-xl">
                  Transaction Details
                </span>
                <div className="w-full flex max-md:flex-col justify-left text-left max-md:space-y-2 space-x-2">
                  <div className="w-12 h-12 flex-none bg-white/5 aspect-square rounded-full drop-shadow-sm p-2">
                    <OperationType type={tx.operation} />
                  </div>
                  <div className="flex-1 truncate md:pr-8 max-md:order-last">
                    <span className="body-1 text-n-1/90">{tx.parentHash}</span>
                  </div>
                  <div onClick={() => handleCopyHash(tx.parentHash)}
                    className="invisible group-hover:visible h-8 w-fit p-1 aspect-square cursor-pointer flex space-x-1 relative border border-n-1/20 transition-all duration-200 bg-n-1/5 rounded-lg ">
                    {selectedHashCopied && (
                      <div className="absolute right-full z-50 bg-accentColor text-fontPrimaryColor body-3 rounded-full px-2 py-0.5">
                        Copied
                      </div>
                    )}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-none stroke-[1.5px] stroke-fontPrimaryColor/60 transition-all duration-200 hover:stroke-accentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.829 12.861c.171-.413.171-.938.171-1.986s0-1.573-.171-1.986a2.25 2.25 0 0 0-1.218-1.218c-.413-.171-.938-.171-1.986-.171H11.1c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C7.5 9.209 7.5 9.839 7.5 11.1v6.525c0 1.048 0 1.573.171 1.986c.229.551.667.99 1.218 1.218c.413.171.938.171 1.986.171s1.573 0 1.986-.171m7.968-7.968a2.25 2.25 0 0 1-1.218 1.218c-.413.171-.938.171-1.986.171s-1.573 0-1.986.171a2.25 2.25 0 0 0-1.218 1.218c-.171.413-.171.938-.171 1.986s0 1.573-.171 1.986a2.25 2.25 0 0 1-1.218 1.218m7.968-7.968a11.68 11.68 0 0 1-7.75 7.9l-.218.068M16.5 7.5v-.9c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.983-.984C14.79 3 14.16 3 12.9 3H6.6c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C3 4.709 3 5.339 3 6.6v6.3c0 1.26 0 1.89.245 2.371c.216.424.56.768.984.984c.48.245 1.111.245 2.372.245H7.5" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col flex-1 space-y-2 overflow-hidden">
                  <div className="my-2 border border-n-1/10 mr-12" />

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">Status</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 border border-accentColor/20 bg-accentColor/5 px-2 rounded-lg body-3 text-accentColor">Success</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">Type</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 px-2 rounded-lg body-3 text-n-1 uppercase">{tx.operation}</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">From</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 bg-accentColor/5 px-2 rounded-lg body-3 text-accentColor">{tx.from}</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">To</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 bg-accentColor/5 px-2 rounded-lg body-3 text-accentColor">{tx.to}</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">Memo</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 px-2 rounded-lg body-3 text-n-1">{tx.memo}</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">Amount</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 px-2 rounded-lg body-3 text-n-1">{tx.amount}</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">Fee</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 px-2 rounded-lg body-3 text-n-1">{tx.fee}</span>
                  </div>

                  <div className=" w-full flex items-start space-x-2">
                    <span className="w-[10%] body-3 text-n-1/80">Timestamp</span>
                    <span>:</span>
                    <span className="w-fit py-0.5 px-2 rounded-lg body-3 text-n-1">{new Date(tx.txTimestamp).toLocaleString()}{`  -  `}<span className="text-n-1/70">({timeAgo(tx.txTimestamp)})</span></span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-n-1/50">
              Transaction not found
            </div>
          )}
        </div>

      </Container>
    </>
  );
};

export default BlockDetail;
