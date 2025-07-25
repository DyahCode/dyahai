import React, { useState } from "react";
import { useAuth } from "../hooks/authHook";
import { uploadBlobToStoracha } from "../hooks/authStoracha";

import Swal from "sweetalert2";
import Button from "../components/ui/Button";
import Loader from "../components/layout/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoMdDownload } from "react-icons/io";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

// Man
import Navbar from "../components/layout/Navbar";

import imageAstronout from "../assets/images/art-styles-models/man/Astronout.jpg";
import imageBackpacker from "../assets/images/art-styles-models/man/Backpacker.jpg";
import imageCyberpunk from "../assets/images/art-styles-models/man/Cyberpunk.jpg";
import imageDetective from "../assets/images/art-styles-models/man/Detective.jpg";
import imageDreamworks from "../assets/images/art-styles-models/man/Dreamworks.jpg";
import imageRenaissance from "../assets/images/art-styles-models/man/Renaissance.jpg";
import imageRetro from "../assets/images/art-styles-models/man/Retro.jpg";
import imageSteampunk from "../assets/images/art-styles-models/man/Steampunk.jpg";
import imageStreetwear from "../assets/images/art-styles-models/man/Streetwear.jpg";
import imageSuperhero from "../assets/images/art-styles-models/man/Superhero.jpg";
import imageWasteland from "../assets/images/art-styles-models/man/Wasteland.jpg";

// Woman
import imageArtisticW from "../assets/images/art-styles-models/women/Artistic.jpg";
import imageCyberpunkW from "../assets/images/art-styles-models/women/Cyberpunk.jpg";
import imageDreamy from "../assets/images/art-styles-models/women/Dreamy.jpg";
import imageFashion from "../assets/images/art-styles-models/women/Fashion.jpg";
import imageKorean from "../assets/images/art-styles-models/women/Korean.jpg";
import imageNature from "../assets/images/art-styles-models/women/Nature.jpg";
import imageRenaissanceW from "../assets/images/art-styles-models/women/Renaissance.jpg";
import imageRetroW from "../assets/images/art-styles-models/women/Retro.jpg";
import imageSchool from "../assets/images/art-styles-models/women/School.jpg";
import imageSoft from "../assets/images/art-styles-models/women/Soft.jpg";
import imageSunset from "../assets/images/art-styles-models/women/Sunset.jpg";

const GeneratePage = () => {
  const {
    credit,
    principalId,
    isLoggedIn,
    Login,
    Logout,
    refreshCredit,
    actor,
    tier,
  } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  
  const [state, setState] = useState({
    isLoading: false,
    selectedFile: null,
    output: "",
    imageUrl: "",
    selectedStyle: "",
    selectedGenderCategory: "man",
    balance: 0,
  });

  const itemStyle = [
    {
      id: "1",
      label: "Astronout",
      image: imageAstronout,
      genderCategory: "man", // add new
      getFile: async () => {
        const response = await fetch(imageAstronout);
        return await response.blob();
      },
    },
    {
      id: "2",
      label: "Backpacker",
      image: imageBackpacker,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageBackpacker);
        return await response.blob();
      },
    },
    {
      id: "3",
      label: "Cyberpunk",
      image: imageCyberpunk,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageCyberpunk);
        return await response.blob();
      },
    },
    {
      id: "4",
      label: "Detective",
      image: imageDetective,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageDetective);
        return await response.blob();
      },
    },
    {
      id: "5",
      label: "Dreamworks",
      image: imageDreamworks,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageDreamworks);
        return await response.blob();
      },
    },
    {
      id: "6",
      label: "Renaissance",
      image: imageRenaissance,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageRenaissance);
        return await response.blob();
      },
    },
    {
      id: "7",
      label: "Retro",
      image: imageRetro,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageRetro);
        return await response.blob();
      },
    },
    {
      id: "8",
      label: "Steampunk",
      image: imageSteampunk,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageSteampunk);
        return await response.blob();
      },
    },
    {
      id: "9",
      label: "Streetwear",
      image: imageStreetwear,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageStreetwear);
        return await response.blob();
      },
    },
    {
      id: "10",
      label: "Superhero",
      image: imageSuperhero,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageSuperhero);
        return await response.blob();
      },
    },
    {
      id: "11",
      label: "Wasteland",
      image: imageWasteland,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageWasteland);
        return await response.blob();
      },
    },
    {
      id: "12",
      label: "Artistic",
      image: imageArtisticW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageArtisticW);
        return await response.blob();
      },
    },
    {
      id: "13",
      label: "Cyberpunk",
      image: imageCyberpunkW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageCyberpunkW);
        return await response.blob();
      },
    },
    {
      id: "14",
      label: "Dreamy",
      image: imageDreamy,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageDreamy);
        return await response.blob();
      },
    },
    {
      id: "15",
      label: "Fashion",
      image: imageFashion,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageFashion);
        return await response.blob();
      },
    },
    {
      id: "16",
      label: "Korean",
      image: imageKorean,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageKorean);
        return await response.blob();
      },
    },
    {
      id: "17",
      label: "Nature",
      image: imageNature,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageNature);
        return await response.blob();
      },
    },
    {
      id: "18",
      label: "Renaissance",
      image: imageRenaissanceW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageRenaissanceW);
        return await response.blob();
      },
    },
    {
      id: "19",
      label: "Retro",
      image: imageRetroW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageRetroW);
        return await response.blob();
      },
    },
    {
      id: "20",
      label: "School",
      image: imageSchool,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageSchool);
        return await response.blob();
      },
    },
    {
      id: "21",
      label: "Soft",
      image: imageSoft,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageSoft);
        return await response.blob();
      },
    },
    {
      id: "22",
      label: "Sunset",
      image: imageSunset,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageSunset);
        return await response.blob();
      },
    },
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
    console.log("File type:", file.type);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setState((prev) => ({ ...prev, selectedFile: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e, setIsDragging) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e, setIsDragging) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e, setState, setIsDragging) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setState((prev) => ({ ...prev, selectedFile: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (credit <= 0) {
      showAlert(
        "warning",
        "WARNING!!!",
        "Insufficient credit. Please add credit to generate images."
      );
      return;
    }
    const { selectedFile, selectedStyle } = state;
    if (!selectedFile || !selectedStyle) {
      showAlert(
        "warning",
        "WARNING!!!",
        !selectedFile
          ? "Please upload an image first."
          : "Please select a style first."
      );
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const blob = base64ToBlob(selectedFile);
      console.log("Converting base64 to blob:", blob);
      console.log("Principal", principalId);
      await uploadImageToBackend(blob);
    } catch (error) {
      console.error("Error uploading image:", error);
      setState((prev) => ({
        ...prev,
        output: "An error occurred while uploading the image.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
      await refreshCredit();
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
      const styleBlob = await selectedStyle.getFile();
      const styleNat8Array = new Uint8Array(await styleBlob.arrayBuffer());

      const response = await actor.send_http_post_request(
        nat8Array,
        styleNat8Array
      );
      console.log("Job ID:", response);
      console.log("Response dari backend Jalan mas:>>", response.type);
      const jobIdText = new TextDecoder().decode(response);
      console.log("Job ID baru:", jobIdText);
      await pollUntilReady(jobIdText);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const pollUntilReady = async (jobId) => {
    const maxRetries = 30;
    const delay = 4000;
    let attempt = 0;

    while (attempt < maxRetries) {
      console.log("attempt : ", attempt);
      try {
        console.log("status belum terpanggil");
        const result = await actor.check_style_status(jobId);
        console.log("status sudah terpanggil : ", result.status);
        if (result.status === "COMPLETED" && result.image) {
          console.log("status sudah completed");

          const byteArray = result.image[0];
          console.log("result.image:", result.image[0]);
          console.log("Length of result.image:", byteArray.length);
          const blob = new Blob([byteArray], { type: "image/png" });
          console.log("data gambar ", blob);
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          setState((prev) => ({ ...prev, imageUrl: dataUrl }));
          const storachaResult = await uploadBlobToStoracha(blob);
          console.log("storachaResult:", storachaResult);

          await actor.save_image_to_store(storachaResult.toString());
          return;
        } else if (result.status === "FAILED") {
          showAlert("error", "Error", "Image generation failed.");
          return;
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
    showAlert("error", "Timeout", "Image generation took too long.");
  };

  // const blobToBase64 = (blob) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result.split(",")[1]);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(new Blob([new Uint8Array(blob)]));
  //   });
  // };

  const handleDeleteAllImages = async () => {
    try {
      const success = await actor.deleteAllImages();
      console.log(
        success
          ? "All images deleted successfully."
          : "Failed to delete all images."
      );
    } catch (error) {
      console.error("Error deleting all images:", error);
    }
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

  const addCredit = async () => {
    try {
      await actor.addCredit(principalId, 1);
      const updatedBalance = await actor.get_balance();
      setState((prev) => ({ ...prev, balance: updatedBalance.toString() }));
    } catch (error) {
      console.error("Error adding credit:", error);
    }
  };

  return (
    <>
      {state.isLoading && <Loader />}
      <main className="bg-primaryColor h-full md:h-dvh w-full flex flex-col justify-between md:flex-row md:overflow-hidden">
        <Navbar
          navbarStyle="secondary"
          principalId={principalId}
          isLoggedIn={isLoggedIn}
          credit={credit}
          Login={Login}
          Logout={Logout}
          tier={tier}
        />

        <section className="pt-[8dvh] relative w-full h-full flex flex-col items-center md:flex-row">
          {/* mt-[16dvh] md:mt-[8dvh] */}
          {/* Left Side */}
          <div className="border-borderShade flex h-full w-full flex-col border-r-2 border-opacity-40 md:w-1/3 bg-secondaryColor">
            {/* Menu Atas */}
            <div className="w-full h-full md:overflow-y-auto px-4 pt-10 py-6">
              <div className="flex flex-col items-center gap-y-6 text-center">
                <div className="text-white">
                  <p>Upload Your Image</p>
                </div>

                <div className="flex w-full flex-col items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    onDragOver={(e) => handleDragOver(e, setIsDragging)}
                    onDragLeave={(e) => handleDragLeave(e, setIsDragging)}
                    onDrop={(e) => handleDrop(e, setState, setIsDragging)}
                    className={`border border-borderShade border-opacity-70 bg-secondaryColor flex w-full max-w-[300px] aspect-square cursor-pointer flex-col items-center justify-center rounded-lg p-1 group ${isDragging ? "ring-2 ring-accentColor2 bg-borderShade/10 scale-105" : ""}`}
                  >
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-lg overflow-hidden group-hover:bg-borderShade/15 ">
                      {state.selectedFile ? (
                        <img
                          src={state.selectedFile}
                          alt="Selected File"
                          className="h-full w-full object-cover rounded-lg"
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
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

                {/* Choose Style Start*/}

                <div className="flex w-full max-w-max flex-col gap-4 text-white">
                  <p>Choose Style:</p>

                  {/* Toggle Button */}
                  <div className="relative flex w-fit mx-auto rounded-full bg-gray-800 p-1">
                    {/* Tombol Man */}
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          selectedGenderCategory: "man",
                          selectedStyle: null,
                        }))
                      }
                      className={`relative z-10 flex items-center gap-1 px-5 py-2 text-sm font-bold rounded-full transition-colors ${
                        state.selectedGenderCategory === "man"
                          ? "text-fontPrimaryColor"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M12 15a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0 0v6m-2-2h4"
                        />
                      </svg>
                      <span>Man</span>
                    </button>

                    {/* Tombol Woman */}
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          selectedGenderCategory: "woman",
                          selectedStyle: null,
                        }))
                      }
                      className={`relative z-10 flex items-center gap-1 px-5 py-2 text-sm font-bold rounded-full transition-colors ${
                        state.selectedGenderCategory === "woman"
                          ? "text-fontPrimaryColor"
                          : "text-gray-400"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M14.232 9.747a6 6 0 1 0-8.465 8.506a6 6 0 0 0 8.465-8.506m0 0L20 4m0 0h-4m4 0v4"
                        />
                      </svg>
                      <span>Woman</span>
                    </button>

                    {/* Indikator Geser */}
                    <div
                      className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-accentColor transition-all duration-300"
                      style={{
                        transform:
                          state.selectedGenderCategory === "woman"
                            ? "translateX(100%)"
                            : "translateX(0%)",
                      }}
                    />
                  </div>

                  <div className="h-auto w-full items-start">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-x-4 xl:gap-x-6 md:gap-y-3 xl:gap-y-4">
                      {itemStyle
                        .filter(
                          (style) =>
                            style.genderCategory ===
                            state.selectedGenderCategory
                        )
                        .map((style) => (
                          <label
                            key={style.id}
                            className="flex flex-col items-center justify-center hover:scale-105 hover:transform duration-200 ease-in-out"
                          >
                            <input
                              type="radio"
                              name="style"
                              className="peer hidden"
                              value={style.id}
                              checked={state.selectedStyle?.id === style.id}
                              onChange={() =>
                                setState((prev) => ({
                                  ...prev,
                                  selectedStyle: style, // Menyimpan seluruh objek style
                                }))
                              }
                            />
                            <div className="max-w-36 aspect-square cursor-pointer rounded-lg border-transparent border-4 peer-checked:border-accentColor2 peer-checked:shadow-xl overflow-hidden">
                              <img
                                src={style.image}
                                alt={style.label}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <p className="mt-1 text-sm text-center">
                              {style.label}
                            </p>
                          </label>
                        ))}

                      {/* {itemStyle.map((style) => (
                        <label
                          key={style.id}
                          className="flex flex-col items-center justify-center hover:scale-105 hover:transform duration-200 ease-in-out"
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
                          <div className="max-w-36 aspect-square cursor-pointer rounded-lg border-transparent border-4 peer-checked:border-accentColor2 peer-checked:shadow-xl overflow-hidden">
                            <img
                              src={style.image}
                              alt={style.label}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="mt-1 text-sm text-center">
                            {style.label}
                          </p>
                        </label>
                      ))} */}
                    </div>
                  </div>
                </div>

                {/* Choose Style End*/}
              </div>
            </div>

            {/* Sticky button */}
            <div className="w-full h-fit flex border-t-2 border-borderShade border-opacity-20 py-4 justify-center items-center md:mb-0">
              <Button
                variant="primary"
                size="md"
                onClick={handleGenerate}
                isMotion
              >
                <span>Generate</span>
                <IoArrowForwardCircleOutline size={25} />
              </Button>
            </div>
          </div>

          {/* Right side */}
          {/* Right side */}
          <div className="h-full w-full md:w-2/3 block">
            <div className="flex flex-col h-full items-center mt-10 m-4 md:mx-0">
              <p className="text-white font-semibold mb-10">Image</p>

              <div className="w-full md:max-w-[30rem] aspect-square flex flex-col items-center justify-center rounded-lg transition duration-100 border border-neutral-500/30 hover:border-neutral-500/25 bg-gradient-to-b from-neutral-800/40 via-neutral-800/20 shadow-xl shadow-accentColor2/5 p-2 group">
                {/* w-[80%] md:w-full max-w-[95vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] md:aspect-[6/3] aspect-square */}
                <div className="text-primaryColor flex h-full w-full items-center justify-center rounded-lg relative">
                  {state.imageUrl ? (
                    <img
                      src={state.imageUrl}
                      alt="Generated Result"
                      className="h-full w-full object-contain rounded-lg"
                    />
                  ) : (
                    <span className="text-white">{state.output || ""}</span>
                  )}
                </div>
              </div>
              <div className="w-fit h-fit flex my-10">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleDownloadImage}
                  className="text-fontPrimaryColor hover:bg-accentColor hover:text-primaryColor flex rounded-full"
                >
                  <span>Download</span>
                  <IoMdDownload size={30} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default GeneratePage;
