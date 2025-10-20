import React, { useEffect, useState } from "react";
import { fetchAllNFT, fetchUserNFT } from "../hooks/fetchNFTCollections";
import { useAuth } from "../provider/authProvider";
import Navbar from "../components/layout/Navbar";
import { Container } from "../components/layout/Container";
import Pagination from "../../src/components/ui/Pagination";
import Footer from "../components/layout/Footer";
import GettingStarted from "../components/layout/sectionHomePage/GettingStarted";
const NftCollection = () => {
  const { authClient } = useAuth();
  const [allNFT, setAllNFT] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(allNFT.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAllNFT = allNFT.slice(startIndex, endIndex);

  useEffect(() => {
    const loadNFTData = async () => {
      const all = await fetchAllNFT();
      setAllNFT(all);
    };

    loadNFTData();
  }, [authClient]);

  return (
    <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit py-8">
      <div className="bg-primaryColor min-h-screen w-full flex flex-col justify-center">
        <Navbar navbarStyle="secondary" />

        <section className="relative w-full h-full flex flex-col items-center">
          <Container className="pt-40">
            <div className="flex flex-col text-fontPrimaryColor items-center justify-center pt-20 border border-borderShade rounded-xl">
              {/* Header */}
              <div className="mb-6 text-white text-center">
                <h1 className="text-2xl font-bold mb-2">NFT Collection</h1>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Explore our exclusive NFT collection and discover unique
                  digital assets available on the DyahAI marketplace. Connect
                  your wallet to start buying or collecting your favorite NFTs.
                </p>
              </div>

              <div className="mb-10 text-white">
                {allNFT.length === 0 ? (
                  <p className="text-gray-500">No NFTs found.</p>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
                    {currentAllNFT.map((nft) => (
                      <div
                        key={nft.id}
                        className="flex h-full w-full flex-col items-start justify-between border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 relative group rounded-md overflow-hidden cursor-pointer"
                        onClick={() => setSelectedNFT(nft)}
                      >
                        {nft.image ? (
                          <div className="flex flex-col items-center gap-3 w-full h-full">
                            <img
                              className="size-full object-cover"
                              src={nft.image}
                              alt={nft.name}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3 rounded-md overflow-hidden">
                            No Image
                          </div>
                        )}
                        <div className="flex flex-col w-full text-xs md:text-sm">
                          <div className="flex w-full justify-between items-center py-2 px-2">
                            <h2 className="font-semibold ">{nft.name}</h2>
                            <span>
                              {"#"} {nft.id}
                            </span>
                          </div>
                          <button className="py-2 px-2 absolute -bottom-16 group-hover:bottom-0 transition-all duration-200 ease-in-out bg-accentColor w-full flex justify-between items-center font-semibold">
                            See Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className=" w-full py-6 flex justify-center items-center px-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </Container>
        </section>
        <GettingStarted />
        <Footer />
      </div>

      {/* Popup Detail NFT */}
      {selectedNFT && (
        <section className="flex w-full h-full justify-center items-center fixed inset-0 bg-black/60 z-[999] backdrop-blur-md text-white animate-fadeIn">
          <div className="relative max-w-[50rem] w-[90%] flex flex-col rounded-2xl bg-[#1c1c1c] shadow-2xl p-6 md:p-8 transform animate-slideUp">
            {/* Close Button */}
            <div className="flex w-full justify-end mb-4">
              <button
                onClick={() => setSelectedNFT(null)}
                className="p-2 rounded-full bg-neutral-800/40 hover:bg-neutral-800/60 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer text-white/80 hover:text-white stroke-[2px] fill-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Gambar NFT */}
              <div className="flex-shrink-0 w-full md:w-1/2">
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  className="w-full rounded-xl object-cover shadow-lg"
                />
              </div>

              {/* Detail NFT */}
              <div className="flex flex-col justify-between w-full md:w-1/2">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedNFT.name}
                  </h2>
                  <p className="text-white/70 text-sm mb-2">
                    ID: #{selectedNFT.id}
                  </p>

                  {/* Deskripsi */}
                  {selectedNFT.description && (
                    <div className="border-t border-white/10 pt-3 mb-4">
                      <p className="text-sm text-white/70 mb-1">Description</p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {selectedNFT.description}
                      </p>
                    </div>
                  )}

                  {/* Properties */}
                  {selectedNFT.properties &&
                    selectedNFT.properties.length > 0 && (
                      <div className="border-t border-white/10 pt-3 mb-4">
                        <p className="text-sm text-white/70 mb-2">Properties</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedNFT.properties.map((prop, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-neutral-800 rounded-full text-xs text-white/80 border border-white/10"
                            >
                              {prop.trait_type}:{" "}
                              <span className="font-semibold">
                                {prop.value}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default NftCollection;
