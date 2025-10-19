

import React from 'react'
import Button from '../../ui/Button';
import Pagination from '../../ui/Pagination';
import { Container } from '../Container';
import { OperationType } from "./BlockExplorerVariants"
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import HeadSection from '../HeadSection';



const BlockExplore = () => {
  const navigate = useNavigate();

  const {
    allTransactions,
    currentPage,
    setCurrentPage,
    totalPages,
    handleSearch,
    searchQuery,
    setSearchQuery,
    handleCopyHash,
    selectedHashCopied,
    timeAgo,
  } = useOutletContext();

  const TotalTransaction = allTransactions.length;

  // const handleNavigateDetail = (hash) => {
  //   navigate(`/block-explorer/${hash}`);
  // };

  return (
    <>
      <HeadSection>
        <h2 className="h2 font-semibold">Explore the DyahAI Ledger</h2>
        <span className="body-2">
          Explore live blockchain data that shapes every creation in DyahAI. Track blocks, verify activity, and see how art meets transparency.
        </span>
      </HeadSection>
      <Container className="flex flex-col items-center z-5">
        <div className="w-full flex space-x-10">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Transaction Hash..."
            className="flex items-center h-[3rem] px-6 bg-n-4/20 border border-n-5 rounded-lg text-base flex-1 outline-none text-fontPrimaryColor placeholder:text-fontPrimaryColor/50"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <div className="w-full flex flex-col space-y-4">
          <div className="w-full flex flex-col justify-between mt-10">
            <h5 className="h4">Transaction</h5>
            <div>
              <span className='body-3 text-n-1/50'>Show itemsPerPage from {TotalTransaction} transaction</span>
            </div>
          </div>

          <div className="w-full flex max-md:flex-col gap-12">
            {/* block transaction */}
            <div className="w-full md:w-[70%] flex flex-col gap-8">
              {allTransactions.map((tx, index) => (
                <div key={index}
                  className="max-w-full flex bg-white/5 h-fit rounded-xl p-6 space-x-2 md:space-x-4 scale-100 hover:scale-[102.5%] transition-all duration-200 group">
                  <div className="w-10 h-10 flex-none bg-white/5 aspect-square rounded-full drop-shadow-sm p-2">
                    <OperationType type={tx.operation} />
                  </div>
                  <div className="flex flex-col flex-1 space-y-2 overflow-hidden">
                    <div className="flex space-x-2 items-center">
                      <div className="flex-1 truncate">
                        <span className="body-1 mt-1 text-fontPrimaryColor">{tx.parentHash}</span>
                      </div>
                      <div onClick={() => handleCopyHash(tx.parentHash)}
                        className="invisible group-hover:visible h-6 aspect-square cursor-pointer flex space-x-1 relative">
                        {selectedHashCopied && (
                          <div className="absolute right-full z-50 bg-accentColor text-fontPrimaryColor text-xs rounded-full px-2 py-1">
                            Copied
                          </div>
                        )}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-none stroke-[1.5px] stroke-fontPrimaryColor/60 transition-all duration-200 hover:stroke-accentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.829 12.861c.171-.413.171-.938.171-1.986s0-1.573-.171-1.986a2.25 2.25 0 0 0-1.218-1.218c-.413-.171-.938-.171-1.986-.171H11.1c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C7.5 9.209 7.5 9.839 7.5 11.1v6.525c0 1.048 0 1.573.171 1.986c.229.551.667.99 1.218 1.218c.413.171.938.171 1.986.171s1.573 0 1.986-.171m7.968-7.968a2.25 2.25 0 0 1-1.218 1.218c-.413.171-.938.171-1.986.171s-1.573 0-1.986.171a2.25 2.25 0 0 0-1.218 1.218c-.171.413-.171.938-.171 1.986s0 1.573-.171 1.986a2.25 2.25 0 0 1-1.218 1.218m7.968-7.968a11.68 11.68 0 0 1-7.75 7.9l-.218.068M16.5 7.5v-.9c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.983-.984C14.79 3 14.16 3 12.9 3H6.6c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C3 4.709 3 5.339 3 6.6v6.3c0 1.26 0 1.89.245 2.371c.216.424.56.768.984.984c.48.245 1.111.245 2.372.245H7.5" />
                        </svg>
                      </div>
                      <div className="w-fit h-fit border bg-accentColor/5 border-accentColor/20 px-2 rounded-full">
                        <span className="text-xs text-accentColor">Success</span>
                      </div>
                    </div>
                    <div className="w-full flex items-center space-x-4">
                      <div className="w-fit border bg-white/5 border-n-1/20 px-2 rounded-full">
                        <span className="text-xs font-thin">{tx.operation}</span>
                      </div>
                      <span className="w-full text-xs text-fontPrimaryColor/40">
                        {timeAgo(tx.txTimestamp)}
                      </span>
                    </div>
                    <div className="h-fit flex space-x-1 md:space-x-2 items-center">
                      <span className="text-sm text-accentColor min-w-10 md:min-w-20 max-md:w-full w-fit rounded-full bg-accentColor/5 px-2 py-1 truncate">
                        {tx.from}
                      </span>
                      <div className="h-8 lg:h-6 p-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          className="size-full fill-accentColor">
                          <path d="M10.565 2.075a3.33 3.33 0 0 1 2.87 0c.394.189.755.497 1.26.928l.079.066c.48.41.939.604 1.58.655l.102.008c.662.053 1.135.09 1.547.236a3.33 3.33 0 0 1 2.03 2.029c.145.412.182.885.235 1.547l.008.102c.051.641.246 1.1.655 1.58l.066.078c.431.506.74.867.928 1.261a3.33 3.33 0 0 1 0 2.87c-.189.394-.497.755-.928 1.26l-.066.079c-.418.49-.605.951-.655 1.58l-.008.102c-.053.662-.09 1.135-.236 1.547a3.33 3.33 0 0 1-2.029 2.03c-.412.145-.885.182-1.547.235l-.102.008c-.641.051-1.1.246-1.58.655l-.079.066c-.505.431-.866.74-1.26.928a3.33 3.33 0 0 1-2.87 0c-.394-.189-.755-.497-1.26-.928l-.079-.066a2.56 2.56 0 0 0-1.58-.655l-.102-.008c-.662-.053-1.135-.09-1.547-.236a3.33 3.33 0 0 1-2.03-2.029c-.145-.412-.182-.885-.235-1.547l-.008-.102a2.56 2.56 0 0 0-.655-1.58l-.066-.079c-.431-.505-.74-.866-.928-1.26a3.33 3.33 0 0 1 0-2.87c.189-.394.497-.755.928-1.26l.066-.079a2.56 2.56 0 0 0 .655-1.58l.008-.102c.053-.662.09-1.135.236-1.547a3.33 3.33 0 0 1 2.029-2.03c.412-.145.885-.182 1.547-.235l.102-.008a2.56 2.56 0 0 0 1.58-.655l.078-.066c.506-.431.867-.74 1.261-.928M12.47 7.97a.75.75 0 0 0 0 1.06l2.22 2.22H7.5a.75.75 0 0 0 0 1.5h7.19l-2.22 2.22a.75.75 0 1 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0" />
                        </svg>
                      </div>
                      <span className="text-sm text-accentColor min-w-10 md:min-w-20 max-md:w-full w-fit rounded-full bg-accentColor/5 px-2 py-1 truncate">
                        {tx.to}
                      </span>
                    </div>
                    <div className="my-2 border border-n-1/10" />
                    <Link className=""
                      // key={tx.index}
                      to={`${tx.parentHash}`}
                      state={{ tx }}>
                      <Button >
                        See details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}

              <div className="w-full flex">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>

            {/* DyahAI Block Detail */}
            < div padding className="max-md:order-first w-full md:w-[30%] h-fit grid grid-cols-2 md:grid-cols-1 gap-1 md:gap-4" >
              {/* DyahAI Rate */}
              <div div className="flex flex-col bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2.5 p-2" >
                <div className="flex w-fit rounded-full border border-fontPrimaryColor/20 bg-fontPrimaryColor/5 px-1.5 py-0.5 md:py-1 items-center space-x-1 pr-4">
                  <div className=" h-6 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-full fill-fontPrimaryColor/60" >
                      <path fillRule="evenodd" d="M8 3a4.99 4.99 0 0 1 4 2c.628.836 1 1.875 1 3a4.98 4.98 0 0 1-.999 3H12a5 5 0 0 1-4 2a5 5 0 0 1-4-1.999V11a5 5 0 0 1 4-8m.948 8H7.052c.277.626.623 1 .948 1s.67-.374.948-1M6 11l-.645.001q.413.364.914.606A6 6 0 0 1 6 11.001m4.645.001H10a6 6 0 0 1-.269.606q.501-.242.914-.606m-5.133-2.5H4.031a4 4 0 0 0 .505 1.5h1.172a9 9 0 0 1-.196-1.5m3.975 0H6.513c.03.544.104 1.05.21 1.5h2.553c.107-.45.182-.956.21-1.5m2.482 0h-1.481a9 9 0 0 1-.196 1.5h1.172a4 4 0 0 0 .505-1.5M5.708 6H4.535c-.261.452-.437.96-.504 1.5h1.481A9 9 0 0 1 5.708 6m3.568 0H6.724a8.4 8.4 0 0 0-.21 1.499h2.973a8.5 8.5 0 0 0-.21-1.5M11.465 6h-1.173c.102.467.17.972.196 1.5h1.481a4 4 0 0 0-.504-1.5M6.269 4.393l-.124.062q-.43.226-.79.545H6a6 6 0 0 1 .269-.607M8 4c-.326 0-.671.375-.948 1h1.896C8.671 4.376 8.326 4 8 4m1.73.393l.038.071q.125.252.232.536h.646a4 4 0 0 0-.915-.607"
                      />
                    </svg>
                  </div>
                  <span className="body-1 text-sm text-fontPrimaryColor/60">DYA Rate</span>
                </div>
                <div className="flex w-full pl-2 space-x-1 items-end">
                  <h5 className="h5 flex proportional-nums text-accentColor">0.0187</h5>
                  <span className="text-xs mb-2 text-fontPrimaryColor/50">ICP</span>
                </div>
              </div>

              {/* DyahAI Market Cap */}
              <div className="flex flex-col bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2.5 p-2">
                <div className="flex w-fit rounded-full border border-fontPrimaryColor/20 bg-fontPrimaryColor/5 px-1.5 py-0.5 md:py-1 items-center space-x-1 pr-4">
                  <div className=" h-6 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-full fill-fontPrimaryColor/60" >
                      <path fillRule="evenodd" d="M8 3a4.99 4.99 0 0 1 4 2c.628.836 1 1.875 1 3a4.98 4.98 0 0 1-.999 3H12a5 5 0 0 1-4 2a5 5 0 0 1-4-1.999V11a5 5 0 0 1 4-8m.948 8H7.052c.277.626.623 1 .948 1s.67-.374.948-1M6 11l-.645.001q.413.364.914.606A6 6 0 0 1 6 11.001m4.645.001H10a6 6 0 0 1-.269.606q.501-.242.914-.606m-5.133-2.5H4.031a4 4 0 0 0 .505 1.5h1.172a9 9 0 0 1-.196-1.5m3.975 0H6.513c.03.544.104 1.05.21 1.5h2.553c.107-.45.182-.956.21-1.5m2.482 0h-1.481a9 9 0 0 1-.196 1.5h1.172a4 4 0 0 0 .505-1.5M5.708 6H4.535c-.261.452-.437.96-.504 1.5h1.481A9 9 0 0 1 5.708 6m3.568 0H6.724a8.4 8.4 0 0 0-.21 1.499h2.973a8.5 8.5 0 0 0-.21-1.5M11.465 6h-1.173c.102.467.17.972.196 1.5h1.481a4 4 0 0 0-.504-1.5M6.269 4.393l-.124.062q-.43.226-.79.545H6a6 6 0 0 1 .269-.607M8 4c-.326 0-.671.375-.948 1h1.896C8.671 4.376 8.326 4 8 4m1.73.393l.038.071q.125.252.232.536h.646a4 4 0 0 0-.915-.607"
                      />
                    </svg>
                  </div>
                  <span className="body-1 text-sm text-fontPrimaryColor/60">DYA Market Cap</span>
                </div>
                <div className="flex w-full space-x-1 items-end">
                  <span className="my-2 text-sm w-fit text-fontPrimaryColor/60 rounded-full border border-fontPrimaryColor/20 bg-fontPrimaryColor/5 px-1.5 py-0.5">Cooming soon</span>
                </div>
              </div>

              {/* DyahAI Generate Process Rate */}
              <div className="flex flex-col bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2.5 p-2">
                <div className="flex w-fit rounded-full border border-fontPrimaryColor/20 bg-fontPrimaryColor/5 px-1.5 py-0.5 md:py-1 items-center space-x-1 pr-4">
                  <div className=" h-6 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full fill-fontPrimaryColor/60" >
                      <path d="M10.367 4.061C9.667 4.567 5 8.158 5 14a7 7 0 0 0 6.92 7a4 4 0 0 1-3.874-4.616c.336-2.254 2.41-4.167 3.412-4.974a.856.856 0 0 1 1.084 0c1.003.807 3.076 2.72 3.412 4.974l.004.034Q16 16.703 16 17a4 4 0 0 1-3.92 4A7 7 0 0 0 19 14.057V14c-.026-4.241-2.896-6.555-3.419-6.942a.14.14 0 0 0-.163 0c-.21.155-.794.618-1.421 1.39a.156.156 0 0 1-.26-.032c-1.18-2.495-2.813-4.009-3.198-4.345a.135.135 0 0 0-.172-.01" />
                    </svg>
                  </div>
                  <span className="body-1 text-sm text-fontPrimaryColor/60">Process Rate</span>
                </div>
                <div className="flex w-full pl-2 space-x-1 items-end">
                  <h5 className="h5 flex proportional-nums text-accentColor">0.0001</h5>
                  <span className="text-xs mb-2 text-fontPrimaryColor/50">DYA</span>
                </div>
              </div>

              {/* DyahAI Transactions */}
              <div className="flex flex-col bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2.5 p-2">
                <div className="flex w-fit rounded-full border border-fontPrimaryColor/20 bg-fontPrimaryColor/5 px-1.5 py-0.5 md:py-1 items-center space-x-1 pr-4">
                  <div className=" h-6 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full fill-none stroke-fontPrimaryColor/60 stroke-[2px] p-1" >
                      <path d="M22 18c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 22 19.4 22 18 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.092-1.092C14 20.1 14 19.4 14 18s0-2.1.273-2.635a2.5 2.5 0 0 1 1.092-1.092C15.9 14 16.6 14 18 14s2.1 0 2.635.273a2.5 2.5 0 0 1 1.092 1.092C22 15.9 22 16.6 22 18Zm0-8c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 14 19.4 14 18 14s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.092-1.092C14 12.1 14 11.4 14 10s0-2.1.273-2.635a2.5 2.5 0 0 1 1.092-1.093C15.9 6 16.6 6 18 6s2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C22 7.9 22 8.6 22 10Zm-8 8c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C12.1 22 11.4 22 10 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C6 20.1 6 19.4 6 18s0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.092C7.9 14 8.6 14 10 14s2.1 0 2.635.273a2.5 2.5 0 0 1 1.092 1.092C14 15.9 14 16.6 14 18ZM10 6c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.093C8.1 10 7.4 10 6 10s-2.1 0-2.635-.272a2.5 2.5 0 0 1-1.093-1.093C2 8.1 2 7.4 2 6s0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 2 4.6 2 6 2s2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 3.9 10 4.6 10 6Z" />
                    </svg>
                  </div>
                  <span className="body-1 text-sm text-fontPrimaryColor/60">Transactions</span>
                </div>
                <div className="flex w-full pl-2 space-x-1 items-end">
                  <h5 className="h5 flex proportional-nums text-accentColor">{TotalTransaction}</h5>
                </div>
              </div>

              {/* DyahAI Last Block */}
              <div className="flex flex-col bg-secondaryColor border border-borderShade/35 rounded-xl overflow-hidden gap-2.5 p-2">
                <div className="flex w-fit rounded-full border border-fontPrimaryColor/20 bg-fontPrimaryColor/5 px-1.5 py-0.5 md:py-1 items-center space-x-1 pr-4">
                  <div className=" h-6 aspect-square">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full fill-fontPrimaryColor/60 p-[0.5px]" >
                      <path d="M16 16q1.65 0 2.825-1.175T20 12t-1.175-2.825T16 8t-2.825 1.175T12 12t1.175 2.825T16 16m0 2q-2.25 0-3.912-1.425T10.075 13H3q-.425 0-.712-.288T2 12t.288-.712T3 11h7.075q.35-2.15 2.013-3.575T16 6q2.5 0 4.25 1.75T22 12t-1.75 4.25T16 18m0-6" />
                    </svg>
                  </div>
                  <span className="body-1 text-sm text-fontPrimaryColor/60">Last Block</span>
                </div>
                <div className="flex w-full pl-2 space-x-1 items-end">
                  <h5 className="h5 flex proportional-nums text-accentColor">{TotalTransaction - 1}</h5>
                </div>
              </div>
            </div>
          </div>


        </div >
      </Container >
    </>
  )
}

export default BlockExplore;