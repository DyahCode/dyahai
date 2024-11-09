import React, { useState } from "react";
import { useAuth } from "../Hooks/authHook";
import { website_backend } from "declarations/website_backend";

import Swal from "sweetalert2";
import Button from "../Components/Elements/Button";
import Loader from "../Components/Fragments/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoMdDownload } from "react-icons/io";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import Navbar from "../Components/Fragments/Navbar";
import imageAstronout from "../assets/images/art-styles-models/astronout.jpg";
import imageCyberpunk from "../assets/images/art-styles-models/cyberpunk.jpg";
import imageJoker from "../assets/images/art-styles-models/joker.jpg";
import imageBaroque from "../assets/images/art-styles-models/baroque.jpg";
import imageFormal from "../assets/images/art-styles-models/formal.jpg";
import imagePainting from "../assets/images/art-styles-models/painting.jpg";
import imageShrek from "../assets/images/art-styles-models/shrek.jpg";
import imageZombie from "../assets/images/art-styles-models/zombie.jpg";

const GeneratePage = () => {
  const { principalId } = useAuth();
  const [state, setState] = useState({
    isLoading: false,
    selectedFile: null,
    output: "",
    imageUrl: "",
    selectedStyle: "",
    balance: 0,
  });

  const itemStyle = [
    { id: "1", label: "Astronout", image: imageAstronout },
    { id: "2", label: "Cyberpunk", image: imageCyberpunk },
    { id: "3", label: "Joker", image: imageJoker },
    { id: "4", label: "Baroque", image: imageBaroque },
    { id: "5", label: "Formal", image: imageFormal },
    { id: "6", label: "Painting", image: imagePainting },
    { id: "7", label: "Shrek", image: imageShrek },
    { id: "8", label: "Zombie", image: imageZombie },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text, confirmButtonText: "OK" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setState((prev) => ({ ...prev, selectedFile: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    const { selectedFile, selectedStyle } = state;
    if (!selectedFile || !selectedStyle) {
      showAlert(
        "warning",
        "WARNING!!!",
        !selectedFile
          ? "Please upload an image first."
          : "Please select a style first.",
      );
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const blob = base64ToBlob(selectedFile);
      await uploadImageToBackend(blob);
    } catch (error) {
      console.error("Error uploading image:", error);
      setState((prev) => ({
        ...prev,
        output: "An error occurred while uploading the image.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const base64ToBlob = (base64, type = "image/jpeg") => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type });
  };

  const uploadImageToBackend = async (imageBlob) => {
    try {
      const { selectedStyle } = state;
      const nat8Array = new Uint8Array(await imageBlob.arrayBuffer());
      const styleBlob = new Blob([selectedStyle], {
        type: "application/octet-stream",
      });
      const styleNat8Array = new Uint8Array(await styleBlob.arrayBuffer());
      const response = await website_backend.send_http_post_request(
        nat8Array,
        styleNat8Array,
        principalId,
      );
      if (response.length === 0) {
        showAlert(
          "warning",
          "WARNING!!!",
          "You have reached the maximum image limit.",
        );
      } else {
        const base64Image = `data:image/png;base64,${await blobToBase64(response)}`;
        setState((prev) => ({ ...prev, imageUrl: base64Image }));
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(new Blob([new Uint8Array(blob)]));
    });
  };


  const handleDownloadImage = () => {
    if (!state.imageUrl) {
      showAlert("warning", "WARNING!!!", "Image Not Found");
      return;
    }
    const link = document.createElement("a");
    link.href = state.imageUrl;
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {state.isLoading && <Loader />}
      <div className="bg-primaryColor flex h-screen w-full flex-col justify-center md:flex-row">
        <Navbar navbarStyle={"secondary"} />
        <div className="bg-primaryColor relative mt-24 flex h-full w-full flex-col items-center justify-start md:fixed md:mt-14 md:flex-row">
          <div className="border-borderShade h-full w-full border-r-2 border-opacity-40 md:w-1/3">
            <div className="flex flex-col items-center gap-y-6 py-8 text-center">
              <div className="text-white">
                <p>Image</p>
              </div>
              <div className="flex w-full flex-col items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="bg-secondaryColor hover:bg-borderShade flex h-[16rem] w-[16rem] cursor-pointer flex-col items-center justify-center rounded-lg p-1"
                >
                  <div className="border-borderShade flex h-full w-full flex-col items-center justify-center rounded-lg border border-opacity-40">
                    {state.selectedFile ? (
                      <img
                        src={state.selectedFile}
                        alt="Selected File"
                        className="rounded-lg object-fill"
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                      />
                    ) : (
                      <>
                        <svg
                          className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          JPEG / JPG (Max. 1024 x 1024 px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
              <div className="flex w-full flex-col gap-4 px-4 text-white">
                <p>Choose Style:</p>
                <div className="h-auto w-full items-start px-6">
                  <div className="grid grid-cols-1 gap-4">
                    <Slider {...settings}>
                      {itemStyle.map((style) => (
                        <label
                          key={style.id}
                          className="flex flex-col items-center justify-center py-2 hover:scale-105 hover:transform"
                        >
                          <input
                            type="radio"
                            name="style"
                            className="peer hidden"
                            value={style.id}
                            checked={state.selectedStyle === style.id}
                            onChange={() =>
                              setState((prev) => ({
                                ...prev,
                                selectedStyle: style.id,
                              }))
                            }
                          />
                          <div className="h-24 w-24 cursor-pointer rounded-lg border-[3px] bg-cover bg-center peer-checked:border-blue-500">
                            <img
                              src={style.image}
                              alt={style.label}
                              className="h-full w-full rounded-lg object-cover"
                            />
                          </div>
                          <p className="mt-2">{style.label}</p>
                        </label>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleGenerate}
                iconButton={<IoArrowForwardCircleOutline size={25} />}
                variant="primaryFull"
              >
                Generate
              </Button>
            </div>
          </div>
          <div className="bg-primaryColor h-full w-full md:w-2/3">
            <div className="flex flex-col items-center gap-4 p-8">
              <div className="text-white">
                <p>Image</p>
              </div>
              <div className="bg-fontPrimaryColor flex h-[20rem] w-[20rem] flex-col items-center justify-center rounded-lg p-2 md:h-[30rem] md:w-[50rem]">
                <div className="text-primaryColor relative flex h-full w-full items-center justify-center rounded-lg border p-1">
                  {state.imageUrl ? (
                    <img
                      src={state.imageUrl}
                      alt="Generated Result"
                      className="max-h-full object-cover"
                    />
                  ) : (
                    state.output || "Results will appear here..."
                  )}
                  <button
                    onClick={handleDownloadImage}
                    className="hover:bg-accentColor3 hover:text-fontPrimaryColor absolute right-0 top-0 max-w-2xl rounded-full border-2 border-transparent p-2"
                  >
                    <IoMdDownload size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneratePage;
