import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Hooks/authHook";
import { website_backend } from "declarations/website_backend";

import { FaEthereum } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const GenerateHistory = () => {
  const [images, setImages] = useState([]);
  const { principalId, isLoggedIn } = useAuth();

  async function loadImages(principalId) {
    try {
      const fetchedImages =
        await website_backend.getImagesByPrincipal(principalId);
      const imagesBase64 = await Promise.all(
        fetchedImages.map(async (img) => {
          const base64 = `data:image/png;base64,${await blobToBase64(img.data)}`;
          return {
            principal: img.principal,
            base64: base64,
          };
        }),
      );
      setImages(imagesBase64);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }

  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(new Blob([new Uint8Array(blob)]));
    });
  }

  function base64ToBlob(base64) {
    try {
      const byteCharacters = atob(base64.split(",")[1]);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      return new Blob([byteNumbers], { type: "image/png" });
    } catch (error) {
      console.error("Error converting base64 to Blob:", error);
      return null;
    }
  }

  async function handleDeleteImage(principal, base64Image) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this image?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        console.log("Image : ", base64Image);
        console.log("principal : ", principal);

        const blob = base64ToBlob(base64Image);
        const arrayBuffer = await blob.arrayBuffer();
        const nat8Array = new Uint8Array(arrayBuffer);
        if (!blob) {
          throw new Error("Failed to convert base64 to Blob.");
        }
        console.log("Image : ", blob);

        const deleteResult =
          await website_backend.deleteImageByPrincipalAndData(
            principal,
            nat8Array,
          );
        console.log("Image delete result:", deleteResult);

        setImages(images.filter((img) => img.base64 !== base64Image));

        Swal.fire("Deleted!", "Your image has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      Swal.fire("Error!", "There was an error deleting your image.", "error");
    }
  }

  function handleDownloadImage(image) {
    if (!image) {
      setAlertMessage("Tidak ada gambar untuk diunduh.");
      return;
    }

    const link = document.createElement("a");
    link.href = image;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  useEffect(() => {
    if (isLoggedIn && principalId) {
      loadImages(principalId);
    }
  }, [isLoggedIn, principalId]);

  return (
    <div className="{} m-4 min-w-fit rounded-lg bg-slate-100 p-5">
      <p className="pb-2 pl-1 text-lg">
        <strong>Generate History</strong>
      </p>
      <div className="grid border-separate grid-flow-row gap-10 overflow-y-auto border py-5 md:px-20">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex h-full w-full flex-col items-start justify-between rounded-md border-[1px] border-[transparent] bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 md:flex-row"
          >
            <div className="flex flex-col items-center gap-3 md:flex-row">
              <div className="h-25 w-25 flex items-center justify-center">
                <img
                  className="size-full h-20 rounded-lg"
                  src={image.base64}
                  alt={`Generated Image ${index + 1}`}
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-navy-700 text-base font-bold">
                  Generated Image {index + 1}
                </h5>
                <p className="mt-1 text-sm font-normal text-gray-600">
                  Principal: {image.principal}
                </p>
              </div>
            </div>
            <div className="flex h-full w-full flex-row items-center justify-center gap-8 md:w-[18%] md:flex-col">
              <div className="text-navy-700 mt-1 flex w-full items-center justify-end">
                <FaEthereum size={19} />
                <div className="text-navy-700 ml-1 flex items-center text-sm font-bold">
                  1 Credit
                </div>
                <div className="ml-2 flex items-center text-sm font-normal text-gray-600">
                  <p>30s ago</p>
                </div>
              </div>
              <div className="flex w-full flex-row justify-end gap-2">
                <button
                  onClick={() =>
                    handleDeleteImage(image.principal, image.base64)
                  }
                  className="hover:bg-accentColor3 hover:text-fontPrimaryColor rounded-full p-1"
                >
                  <MdDeleteForever size={20} />
                </button>
                <button
                  onClick={() => handleDownloadImage(image.base64)}
                  className="hover:bg-accentColor3 hover:text-fontPrimaryColor rounded-full p-1"
                >
                  <IoMdDownload size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerateHistory;
