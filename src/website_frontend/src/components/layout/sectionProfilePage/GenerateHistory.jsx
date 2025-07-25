import React, { useState, useEffect } from "react";
import { useAuth } from "../../../provider/authProvider";
import { removeContentFromStoracha } from "../../../hooks/authStoracha";
// import { website_backend } from '../../../../../declarations/website_backend';

import { FaEthereum } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const GenerateHistory = ({ principalId, isLoggedIn }) => {
  const { actor } = useAuth();
  const [images, setImages] = useState([]);

  async function loadImages() {
    try {
      const fetchedImages = await actor.get_images_by_principal();
      console.log("fetched:", fetchedImages);

      const ResultCid = fetchedImages.map((cid) => ({
        id : cid,
        url: `https://${cid}.ipfs.w3s.link/`,
      }));

      setImages(ResultCid);
      console.log("setImages :>>", ResultCid);
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }
  // function blobToBase64(blob) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(",")[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(new Blob([new Uint8Array(blob)]));
  //   });
  // }

  // function base64ToBlob(base64) {
  //   try {
  //     const byteCharacters = atob(base64.split(",")[1]);
  //     const byteNumbers = new Uint8Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  //     return new Blob([byteNumbers], { type: "image/png" });
  //   } catch (error) {
  //     console.error("Error converting base64 to Blob:", error);
  //     return null;
  //   }
  // }

  async function handleDeleteImage(id,imageIndex) {
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
        console.log("Image Index: ", imageIndex);

        // Mengirim permintaan ke backend untuk menghapus gambar berdasarkan index
        await actor.delete_image_by_index(imageIndex);
        await removeContentFromStoracha(id);


        // Memperbarui tampilan dengan menghapus gambar dari array berdasarkan index
        setImages(images.filter((_, index) => index !== imageIndex));

        // Menampilkan notifikasi sukses
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
    if (isLoggedIn && principalId && actor) {
        loadImages();
      }
  }, [actor, isLoggedIn, principalId]);

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
                  src={image.url}
                  alt={`Generated Image ${index + 1}`}
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-navy-700 text-base font-bold">
                  Generated Image {index + 1}
                </h5>
                {/* Tidak menampilkan principal lagi */}
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
                  onClick={() => handleDeleteImage(image.id, index)}
                  className="hover:bg-accentColor3 hover:text-fontPrimaryColor rounded-full p-1"
                >
                  <MdDeleteForever size={20} />
                </button>
                <button
                  onClick={() => handleDownloadImage(image.url)}
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