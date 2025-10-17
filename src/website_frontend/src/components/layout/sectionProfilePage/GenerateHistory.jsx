import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/authProvider";
import { removeContentFromStoracha } from "../../../hooks/authStoracha";
import { usePopup } from "../../../provider/PopupProvider";
import MintingSnap from "../../ui/MintingSnap";

import { MintNft } from "../../../hooks/wallet";

const GenerateHistory = ({
  principalId,
  isLoggedIn,
  actor,
  actorLedger,
  authClient,
  credit,
  refreshCredit,
}) => {
  const { loading, website_backend } = useAuth();
  const { showPopup, hidePopup } = usePopup();
  const [showMintingSnap, setShowMintingSnap] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const selectedOptionRef = useRef([]);
  const navigate = useNavigate();

  const [minting, setMinting] = useState({
    id: null,
    name: null,
    description: null,
    assets: {
      url: null,
      mime: null,
      purpose: null,
    },
    created_at_time: null,
    is_public: null,
    is_minted: null,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectedOptionIndex !== null &&
        selectedOptionRef.current[selectedOptionIndex] &&
        !selectedOptionRef.current[selectedOptionIndex].contains(event.target)
      ) {
        setSelectedOptionIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOptionIndex]);

  async function loadImages() {
    try {
      const fetchedImages =
        await website_backend.get_images_by_principal(principalId);
      setImages(fetchedImages);
      console.log("fetchedImages", fetchedImages);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteImage(id, imageIndex) {
    showPopup({
      title: "Deleting selected image now!",
      message:
        "Do you really want to delete this image? This action cannot be undone.",
      type: "warning",
      leftLabel: "Yes",
      onLeft: async () => {
        await actor.delete_image_by_index(imageIndex);
        await removeContentFromStoracha(id);
        setImages(images.filter((_, index) => index !== imageIndex));
        hidePopup();
      },
      rightLabel: "Cancel",
      onRight: () => hidePopup(),
    });
  }

  async function handleMintingNft(metadata) {
    const result = await MintNft(actor, principalId, {
      id: metadata.id,
      name: metadata.name,
      description: metadata.description,
      url: metadata.assets.url,
      mime: metadata.assets.mime,
    });

    if (result.Ok) {
      showPopup({
        title: "NFT Minted",
        message: `The NFT has been minted successfully.<br>Nft ID:${Number(result.Ok[0].Ok)}`,
        type: "success",
        leftLabel: "Done",
        onLeft: () => hidePopup(),
      });
    }
  }

  async function handleDownloadImage(image, id) {
    try {
      const response = await fetch(image, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `generated-image-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download Failed:", error);
    }
  }

  useEffect(() => {
    if (isLoggedIn && principalId && actor) {
      loadImages();
    }
  }, [actor, isLoggedIn, principalId]);

  function timeAgo(date) {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInSeconds = Math.floor((now - dateObj) / 1000);

    if (diffInSeconds < 5) return "just now";
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} days ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} weeks ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;

    const years = Math.floor(days / 365);
    return `${years} years ago`;
  }

  const toggleOption = (index) => {
    setSelectedOptionIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="max-h-[100%] overflow-y-auto">
      <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8 gap-4">
        <p className="pb-2 pl-1 md:text-lg md:font-semibold text-neutral-300">
          Generate History
        </p>

        {/* Image Generate */}
        <div className="w-full bg-primaryColor p-4 rounded-md border border-borderShade">
          <div className="overflow-y-auto max-h-[600px] pr-2">
            {loading ? (
              <div className="flex h-full w-full flex-col items-start justify-between rounded-lg border border-borderShade/40 overflow-hidden animate-pulse">
                <div className="flex h-[55px] w-full bg-white/10 items-center">
                  <div
                    key={index}
                    className="flex h-20 w-full flex-col items-start justify-between rounded-lg border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 overflow-hidden relative group"
                  ></div>
                </div>
              </div>
            ) : !loading && !images.length ? (
              <button
                onClick={() => navigate("/generate")}
                className="flex h-[225px] w-full flex-col items-start justify-between rounded-lg bg-borderShade/40 overflow-hidden"
              >
                {/* Gambar */}
                <div className="flex flex-col items-center justify-center gap-4 size-full aspect-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-20 fill-white opacity-10"
                  >
                    <path
                      fill="currentColor"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12M12 7.75a.75.75 0 0 0-.75.75v2.75H8.5a.75.75 0 0 0 0 1.5h2.75v2.75a.75.75 0 0 0 1.5 0v-2.75h2.75a.75.75 0 0 0 0-1.5h-2.75V8.5a.75.75 0 0 0-.75-.75"
                    />
                  </svg>
                  <span className="text-base font-extrabold opacity-30 tracking-wider">
                    Generate First
                  </span>
                </div>
              </button>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {images.map((image, index) => (
                <div
                  key={index}
                  className="flex h-full w-full flex-col bg-red items-start justify-between rounded-lg border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 relative group"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image.assets.url}
                    alt={`Generated Image ${index + 1}`}
                  />
                  {/* top-left token */}
                  <div className="top-2 left-2 absolute items-center  bg-transparent/20 transition transform p-0.5 rounded-md w-10 flex aspect-square justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="size-4 fill-yellow-600"
                    >
                      <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m2.75 17.61v1.89a.75.75 0 0 1-1.5 0v-1.38a5.7 5.7 0 0 1-1.25.13h-.25v1.25a.75.75 0 0 1-1.5 0v-1.25H8.5a.75.75 0 0 1-.59-.25a.73.73 0 0 1-.13-.65l2-7.5a.74.74 0 0 1 1.44.38l-1.74 6.52H12a4.75 4.75 0 0 0 0-9.5H6.5a.75.75 0 0 1 0-1.5h3.75V4.5a.75.75 0 0 1 1.5 0v1.25H12a5.7 5.7 0 0 1 1.25.13V4.5a.75.75 0 0 1 1.5 0v1.89a6.25 6.25 0 0 1 0 11.22" />
                    </svg>
                    <span className="text-navy-700 ml-1 flex items-center text-base font-extrabold proportional-nums text-yellow-600 select-none">
                      1
                    </span>
                  </div>

                  {/* top-right download */}
                  <button
                    onClick={() =>
                      handleDownloadImage(image.assets.url, image.id)
                    }
                    className={`top-2 right-2 items-center absolute border-2 border-black/30 hover:bg-black/70 transition transform p-0.5 rounded-md h-8 
                      ${selectedOptionIndex === index ? "visible" : "invisible group-hover:visible"}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-full fill-white"
                      viewBox="0 0 24 24"
                    >
                      <path d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                    </svg>
                  </button>

                  {/* Bottom Image Information */}
                  <div
                    className={`w-full flex absolute bottom-0 space-x-2 p-2 items-end 
                      ${selectedOptionIndex === index ? "visible" : "invisible group-hover:visible"}`}
                  >
                    {/* Detail */}
                    <div className="bottom-2 left-2 flex flex-col items-start justify-center border-2 border-black/30  transition transform p-1 rounded-md flex-1">
                      <span className="text-xs font-medium">
                        Generated Image {index + 1}
                      </span>
                      <span className="text-[0.65rem] font-light">
                        {timeAgo(Number(image.created_at_time / 1_000_000n))}
                      </span>
                    </div>

                    {/* more button */}
                    <button
                      onClick={() => toggleOption(index)}
                      className="bottom-2 right-2 items-center border-2 border-black/30 hover:bg-black/70 transition transform p-0.5 rounded-md h-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-4 fill-white"
                      >
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0" />
                      </svg>
                    </button>
                  </div>

                  {/* More Button Menu */}
                  {selectedOptionIndex === index && (
                    <div
                      ref={(el) => (selectedOptionRef.current[index] = el)}
                      className="absolute bottom-10 right-2 bg-secondaryColor border border-borderShade rounded-md shadow-lg z-50 p-1 space-y-1"
                    >
                      <button
                        onClick={() => {
                          setMinting(image);
                          setSelectedOptionIndex(index); // simpan index yang aktif
                          setShowMintingSnap(true);
                        }}
                        // onClick={() => handleMintingNft(image)}
                        disabled={image.is_minted || minting.is_minted}
                        className="duration-200 transition w-full bg-transparent hover:bg-accentColor/20 disabled:bg-fontPrimaryColor/10 disabled:text-fontPrimaryColor/60 disabled:cursor-not-allowed hover:text-fontPrimaryColor hover:fill-fontPrimaryColor disabled:fill-fontPrimaryColor/60 flex justify-start items-center p-0.5 rounded-sm  gap-2"
                      >
                        <div className="h-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-full fill-current p-0.5"
                            viewBox="0 0 512 512"
                          >
                            <path d="M512 169.943c-50.296 12.033-91.653 12.632-127.443 7.49c-22.895 27.979-36.901 56.091-48.568 83.737c48.693-13.64 96.583-31.712 136.124-55.34c-42.697 31.493-92.067 53.554-141.817 69.276c-20.269 54.594-39.842 100.591-77.074 129.566c58.39-20.34 160.245-75.81 258.778-234.729m-263.637 219.67c80.103-69.55 48.78-188.267 203.384-290.824c-255.72-50.577-368.809 40.644-388.144 54.746c-103.994 75.841-56.637 198.26-24.04 169.647c53.276-46.09 133.296-158.44 286.56-198.737C186.999 162.294 88.86 295.126 63.094 328.528c-45.598 69.997 89.654 148.643 185.27 61.084" />
                          </svg>
                        </div>
                        <span className="text-xs">Minting</span>
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadImage(image.assets.url, image.id)
                        }
                        className="duration-200 transition w-full bg-transparent hover:bg-accentColor/20 hover:text-fontPrimaryColor flex justify-start items-center p-0.5 rounded-sm gap-2"
                      >
                        <div className="h-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-full fill-white"
                            viewBox="0 0 24 24"
                          >
                            <path d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                          </svg>
                        </div>
                        <span className="text-xs">Download</span>
                      </button>
                      <button
                        onClick={() => handleDeleteImage(image.id, index)}
                        className="duration-200 transition w-full bg-transparent hover:bg-accentColor/20 hover:text-fontPrimaryColor bottom-0 right-0 flex justify-start items-center p-0.5 rounded-sm gap-2"
                      >
                        <div className="h-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="size-full fill-none stroke-white stroke-[2px] p-[1.5px]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m20 9l-1.995 11.346A2 2 0 0 1 16.035 22h-8.07a2 2 0 0 1-1.97-1.654L4 9m17-3h-5.625M3 6h5.625m0 0V4a2 2 0 0 1 2-2h2.75a2 2 0 0 1 2 2v2m-6.75 0h6.75"
                            />
                          </svg>
                        </div>
                        <span className="text-xs">Delete</span>
                      </button>
                    </div>
                  )}
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <MintingSnap
        showMintingSnap={showMintingSnap}
        setShowMintingSnap={setShowMintingSnap}
        actor={actor}
        principalId={principalId}
        minting={minting}
        setMinting={setMinting}
        setImages={setImages}
        selectedIndex={selectedOptionIndex}
        images={images}
        authClient={authClient}
        actorLedger={actorLedger}
        credit={credit}
        refreshCredit={refreshCredit}
      />
    </div>
  );
};

export default GenerateHistory;
