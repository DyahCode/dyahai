import React, { useEffect, useState } from "react";
import { fetchAllNFT, fetchUserNFT } from "../hooks/fetchNFTCollections";
import { useAuth } from "../provider/authProvider";

const NftCollection = () => {
  const { credit, principalId, isLoggedIn, Login, Logout, tier, authClient } =
    useAuth();

  const [allNFT, setAllNFT] = useState([]);
  const [userNFT, setUserNFT] = useState([]);

  useEffect(() => {
    const loadNFTData = async () => {
      const all = await fetchAllNFT();
      setAllNFT(all);

      if (authClient) {
        const user = await fetchUserNFT(authClient);
        setUserNFT(user);
      }
    };

    loadNFTData();
  }, [authClient]);

  return (
    <div className="max-h-[100%] overflow-y-auto flex flex-col gap-16 p-20">
      <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8">
        <div className="mb-10 text-white">
          <h2 className="text-xl font-bold mb-4">User NFTs</h2>
          {userNFT === 0 ? (
            <p className="text-gray-500">No NFTs found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userNFT.map((nft) => (
                <div
                  key={nft.id}
                  className="flex h-full w-full flex-col items-start justify-between border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 relative group rounded-md overflow-hidden cursor-pointer"
                >
                  {nft.image ? (
                    <div className="flex flex-col items-center gap-3 ">
                      <img
                        className="size-full "
                        src={nft.image}
                        alt={nft.name}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 rounded-md overflow-hidden">
                      No Image
                    </div>
                  )}
                  <div className="flex flex-col w-full">
                    <div className="flex w-full justify-between items-center py-4 px-2 text-md">
                      <h2 className="font-semibold">{nft.name}</h2>
                      <div className="flex justify-center items-center gap-0.5 text-white group-hover:text-accentColor ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path
                              fill="currentColor"
                              d="M10.823 2.393a1.5 1.5 0 0 1 2.355 0l6.603 8.368a2 2 0 0 1 0 2.478l-6.603 8.368a1.5 1.5 0 0 1-2.356 0L4.22 13.24a2 2 0 0 1 0-2.478l6.603-8.368Z"
                            />
                          </g>
                        </svg>
                        <span className="font-medium">
                          {"#"} {nft.id}
                        </span>
                      </div>
                    </div>

                    <div className="py-2 px-2 w-full font-semibold">
                      <div className="flex gap-2 text-sm">
                        0.005
                        <span className="text-white/50">DYA</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="text-white/50">Last sale</span>
                        0.005
                        <span className="text-white/50">DYA</span>
                      </div>
                    </div>
                    <button className="py-4 px-2 absolute -bottom-14 group-hover:bottom-0 transition-all duration-200 ease-in-out bg-accentColor w-full flex justify-between items-center font-semibold text-xs">
                      <span>Buy Now</span>
                      0.005
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8">
        <div className="mb-10 text-white">
          <h2 className="text-xl font-bold mb-4">All NFT</h2>
          {allNFT === 0 ? (
            <p className="text-gray-500">No NFTs found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allNFT.map((nft) => (
                <div
                  key={nft.id}
                  className="flex h-full w-full flex-col items-start justify-between border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 relative group rounded-md overflow-hidden cursor-pointer"
                >
                  {nft.image ? (
                    <div className="flex flex-col items-center gap-3 ">
                      <img
                        className="size-full "
                        src={nft.image}
                        alt={nft.name}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 rounded-md overflow-hidden">
                      No Image
                    </div>
                  )}
                  <div className="flex flex-col w-full">
                    <div className="flex w-full justify-between items-center py-4 px-2 text-md">
                      <h2 className="font-semibold">{nft.name}</h2>
                      <div className="flex justify-center items-center gap-0.5 text-white group-hover:text-accentColor ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" fill-rule="evenodd">
                            <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path
                              fill="currentColor"
                              d="M10.823 2.393a1.5 1.5 0 0 1 2.355 0l6.603 8.368a2 2 0 0 1 0 2.478l-6.603 8.368a1.5 1.5 0 0 1-2.356 0L4.22 13.24a2 2 0 0 1 0-2.478l6.603-8.368Z"
                            />
                          </g>
                        </svg>
                        <span className="font-medium">
                          {"#"} {nft.id}
                        </span>
                      </div>
                    </div>

                    <div className="py-2 px-2 w-full font-semibold">
                      <div className="flex gap-2 text-sm">
                        0.005
                        <span className="text-white/50">DYA</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <span className="text-white/50">Last sale</span>
                        0.005
                        <span className="text-white/50">DYA</span>
                      </div>
                    </div>
                    <button className="py-4 px-2 absolute -bottom-14 group-hover:bottom-0 transition-all duration-200 ease-in-out bg-accentColor w-full flex justify-between items-center font-semibold text-xs">
                      <span>Buy Now</span>
                      0.005
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftCollection;

// useEffect(() => {
//   const loadNFTs = async () => {
//     setLoading(true);
//     try {
//       // Fetch all NFTs
//       const allResponse = await fetchAllCollections();
//       console.log('allResponse', allResponse)
//       const parsedAll =
//         allResponse?.status && Array.isArray(allResponse?.metadata)
//           ? allResponse.metadata.map((nftMeta) => {
//               const obj = {};
//               const fields = nftMeta;
//               obj.id = fields.id;
//               fields.metadata[0].forEach(([key, value]) => {
//                 if (key === "icrc7:metadata:uri:image")
//                   obj.image = value.Text;
//                 if (key === "icrc7:metadata:uri:name") obj.name = value.Text;
//                 if (key === "icrc7:metadata:uri:description")
//                   obj.description = value.Text;
//                 if (key === "icrc7:metadata:uri:mime") obj.mime = value.Text;
//               });
//               return obj;
//             }).reverse()
//           : [];

//       setAllNFTs(parsedAll);

//       // Fetch user NFTs
//       if (authClient) {
//         const userResponse = await fetchUserCollections(authClient);
//         const parsedUser =
//           userResponse?.status && Array.isArray(userResponse?.metadata)
//             ? userResponse.metadata.map((nftMeta) => {
//                 const obj = {};
//                 const fields = nftMeta;
//                 obj.id = fields.id;
//                 fields.metadata[0].forEach(([key, value]) => {
//                   if (key === "icrc7:metadata:uri:image")
//                     obj.image = value.Text;
//                   if (key === "icrc7:metadata:uri:name")
//                     obj.name = value.Text;
//                   if (key === "icrc7:metadata:uri:description")
//                     obj.description = value.Text;
//                   if (key === "icrc7:metadata:uri:mime")
//                     obj.mime = value.Text;
//                 });
//                 return obj;
//               }).reverse()
//             : [];

//         setUserNFTs(parsedUser);
//       }
//     } catch (err) {
//       console.error("Failed to load NFTs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   loadNFTs();
// }, [authClient]);
