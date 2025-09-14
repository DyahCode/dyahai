import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/authProvider";
import { removeContentFromStoracha } from "../../../hooks/authStoracha";
import { IoMdDownload } from "react-icons/io";
import { usePopup } from "../../../provider/PopupProvider";

const GenerateHistory = ({ principalId, isLoggedIn }) => {
  const { loading, actor, website_backend } = useAuth();
  const { showPopup, hidePopup } = usePopup();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);

  async function loadImages() {
    try {
      const fetchedImages = await website_backend.get_images_by_principal(principalId);
      const ResultCid = fetchedImages.map((cid) => ({
        id: cid,
        url: `https://${cid}.ipfs.w3s.link/`,
      }));

      setImages(ResultCid);
    } catch (error) {
    }
  }

  async function handleDeleteImage(id, imageIndex) {
    try {
      showPopup({
        title: "Deleting selected image now!",
        message: "Do you really want to delete this image? This action cannot be undone.",
        type: "warning",
        leftLabel: "Yes",
        onLeft: async () => {
          await actor.delete_image_by_index(imageIndex);
          await removeContentFromStoracha(id);
          setImages(images.filter((_, index) => index !== imageIndex));

          showPopup({
            title: "Image Deleted",
            message: "The selected image has been removed successfully.",
            type: "success",
            leftLabel: "Done",
            onLeft: async () => { hidePopup(); },
          });
        },
        rightLabel: "Cancel",
        onRight: () => { hidePopup() },
      });

    } catch (error) {
      showPopup({
        title: "Error Deleting Image",
        message: "Something went wrong while deleting the image. Please try again.",
        type: "error",
        leftLabel: "OK",
        onLeft: async () => { hidePopup() },
      });
    }
  }


  async function handleDownloadImage(image,id) {
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

  return (
    <div className="max-h-[100%] overflow-y-auto">
      <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8">

        <p className="pb-2 pl-1 md:text-lg md:font-semibold text-neutral-300">
          Generate History
        </p>
        <div className="flex border-separate flex-col gap-1 rounded-lg mt-4">

          {/* section header */}
          <div className="border-borderShade grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 flex-row rounded-md border border-opacity-20 p-2">
            {loading ? (
              <div
                className="flex h-full w-full flex-col items-start justify-between rounded-lg border border-borderShade/40 overflow-hidden animate-pulse"
              >

                <div className="flex h-[55px] w-full bg-white/10 items-center">
                  <div
                    key={index}
                    className="flex h-20 w-full flex-col items-start justify-between rounded-lg border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 overflow-hidden relative group">

                  </div>

                </div>
              </div>
            ) : !loading && !images.length ? (
              <button
                onClick={() => navigate("/generate")}
                className="flex h-[225px] w-full flex-col items-start justify-between rounded-lg bg-borderShade/40 overflow-hidden"
              >
                {/* Gambar */}
                <div className="flex flex-col items-center justify-center gap-4 size-full aspect-square">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-20 fill-white opacity-10">
                    <path fill="currentColor" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12M12 7.75a.75.75 0 0 0-.75.75v2.75H8.5a.75.75 0 0 0 0 1.5h2.75v2.75a.75.75 0 0 0 1.5 0v-2.75h2.75a.75.75 0 0 0 0-1.5h-2.75V8.5a.75.75 0 0 0-.75-.75" />
                  </svg>
                  <span className="text-base font-extrabold opacity-30 tracking-wider">Generate First</span>
                </div>
              </button>
            ) : (
              images.map((image, index) => (
                <div
                  key={index}
                  className="flex h-full w-full flex-col items-start justify-between rounded-lg border border-borderShade/40 transition-all duration-150 hover:border-borderShade/70 overflow-hidden relative group"
                >
                  {/* Informasi Coin Used */}
                  <div className="absolute h-6 flex flex-row pl-1 pr-2 bg-white items-center rounded-ee-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-yellow-600">
                      <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m2.75 17.61v1.89a.75.75 0 0 1-1.5 0v-1.38a5.7 5.7 0 0 1-1.25.13h-.25v1.25a.75.75 0 0 1-1.5 0v-1.25H8.5a.75.75 0 0 1-.59-.25a.73.73 0 0 1-.13-.65l2-7.5a.74.74 0 0 1 1.44.38l-1.74 6.52H12a4.75 4.75 0 0 0 0-9.5H6.5a.75.75 0 0 1 0-1.5h3.75V4.5a.75.75 0 0 1 1.5 0v1.25H12a5.7 5.7 0 0 1 1.25.13V4.5a.75.75 0 0 1 1.5 0v1.89a6.25 6.25 0 0 1 0 11.22" />
                    </svg>
                    <span className="text-navy-700 ml-1 flex items-center text-base font-extrabold proportional-nums text-yellow-600 select-none">
                      1
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button onClick={() => handleDeleteImage(image.id, index)}
                    className="flex top-0 right-0 absolute h-6 flex-row pl-1.5 group-hover:pl-2 pr-1 items-center rounded-es-lg bg-red-500 transition transform space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-white group-hover:">
                      <path d="M7.5 1h9v3H22v2h-2.029l-.5 17H4.529l-.5-17H2V4h5.5zm2 3h5V3h-5zM6.03 6l.441 15h11.058l.441-15zm3.142 3.257L12 12.086l2.828-2.829l1.415 1.415l-2.829 2.828l2.829 2.828l-1.415 1.415L12 14.914l-2.828 2.829l-1.415-1.415l2.829-2.828l-2.829-2.828z" />
                    </svg>
                    <span className="hidden group-hover:block transition transform text-sm font-medium">Delete</span>
                  </button>
                  {/* Download Button */}

                  {/* Image */}
                  <div className="flex flex-col items-center gap-3">
                    <img
                      className="size-full"
                      src={image.url}
                      alt={`Generated Image ${index + 1}`}
                    />
                  </div>

                  <div className="flex h-full w-full flex-row bg-white items-center text-primaryColor">
                    <div className="m-0.5 ml-1 h-fit overflow-hidden line-clamp-1 md:m-1 md:ml-2 flex flex-1 flex-col">
                      <span className="text-navy-700 text-xs font-medium">
                        Generated Image {index + 1}
                      </span>
                      <p className="text-[0.65rem] font-light text-gray-600">30s ago</p>
                    </div>

                    <button
                      onClick={() => handleDownloadImage(image.url,image.id)}
                      className="duration-200 transition h-full size-fit bg-transparent aspect-square hover:bg-accentColor3 hover:text-fontPrimaryColor bottom-0 right-0 flex justify-center items-center rounded-ss-lg"
                    >
                      <IoMdDownload size={20} />
                    </button>

                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div >
  );
};

export default GenerateHistory;