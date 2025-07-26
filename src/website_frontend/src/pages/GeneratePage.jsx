import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import { uploadBlobToStoracha, removeContentFromStoracha } from "../hooks/authStoracha";

import Swal from "sweetalert2";
import Button from "../components/ui/Button";
import Loader from "../components/layout/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoMdDownload } from "react-icons/io";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import Navbar from "../components/layout/Navbar";

const imageAstronout = "https://bafybeieyzmxnhikq4ncpn45dkzfi25n23lgvnyacfh5lkfwlqo4l5cbpt4.ipfs.w3s.link/Astronout.jpg"
const imageBackpacker = "https://bafybeicbpqiiibishqfergji5w2rpinbrwxg3lidshak4kpylwivdymuku.ipfs.w3s.link/Backpacker.jpg"
const imageCyberpunk = "https://bafybeidwtzzsf7pbrhfocvsckg6ic6bslvgnbwclrbveh4m2gnccdwl5bi.ipfs.w3s.link/Cyberpunk.jpg"
const imageDetective = "https://bafybeidbim4pl7hd23xojeq725nuld5kercevmkrv3ujdqoe35q7z64k3y.ipfs.w3s.link/Detective.jpg"
const imageDreamworks = "https://bafybeifeyskurvgchu64idrhs3bksjil5moze5pnbto33uj3b3kwcpqise.ipfs.w3s.link/Dreamworks.jpg"
const imageRenaissance = "https://bafybeihpeu2aznlixb4dmuuyakyd6zfkywvicja3gzzfuzztwpo4uo64bu.ipfs.w3s.link/Renaissance.jpg"
const imageRetro = "https://bafybeid5xc6pzdkdul44uloo2n3s4fy67qx3q3uqh4civ4ay7rwrihwti4.ipfs.w3s.link/Retro.jpg"
const imageSteampunk = "https://bafybeiejbuctvdoongnkvspb7dhm5b6z7abdf2cq3vnk2oif5yppe6thbq.ipfs.w3s.link/Steampunk.jpg"
const imageStreetwear = "https://bafybeiezxel763ndqzb6lf2s6v7p6bm2nra4xyjdavhr6ktyl366qkilnu.ipfs.w3s.link/Streetwear.jpg"
const imageSuperhero = "https://bafybeih4yqiuaelvdpvfe6hkdggxsbotq7uyzvrmzyx7espfizv3blye4e.ipfs.w3s.link/Superhero.jpg"
const imageWasteland = "https://bafybeihterx5pdlv4yecxpfouyabl3sdswmgocycnqkii4aevshvlg74iu.ipfs.w3s.link/Wasteland.jpg"

const imageArtisticW = "https://bafybeighc4i47mpv43e7grqb25a32tfbmodvujml6ab3nieklkamjejxyq.ipfs.w3s.link/Artistic.jpg"
const imageCyberpunkW = "https://bafybeigszelbvuyn5cc7dacxxgq2e4eoql2cdn37ixy3cz73lcq34zvaum.ipfs.w3s.link/Cyberpunk.jpg"
const imageDreamy = "https://bafybeia2i7aok5tdtrojxdwlsykkzbg7fj7a5lkj3uafelbtb5jptlfmmq.ipfs.w3s.link/Dreamy.jpg"
const imageFashion = "https://bafybeiewlwtaavsx2wr6gmvixmfdrpuh2w7hako2sj3a5kj442z6gee4z4.ipfs.w3s.link/Fashion.jpg"
const imageKorean = "https://bafybeihzldu2nmz6vktsdus36dkior2smf5jti5jrfpdrdjk3qdkkxvqwa.ipfs.w3s.link/Korean.jpg"
const imageNature = "https://bafybeiby3zppnjdfuuyo2wcghv7g2dvgwsqgsbzlbwadpedvak6sqaux4m.ipfs.w3s.link/Nature.jpg"
const imageRenaissanceW = "https://bafybeiesv7d6veak3wcfxfz4zrdxarvkkljcyzrdxlzw6f3rpvkwkpelui.ipfs.w3s.link/Renaissance.jpg"
const imageRetroW = "https://bafybeie2yzo3rwvgsmognxbt5x3g6c4qmz5t5vx2qinfywhbkiuil3q6pa.ipfs.w3s.link/Retro.jpg"
const imageSchool = "https://bafybeicd6jt4wldzr5x27p2gey2xczkavam5wynmhjgx6v2kz37inixhre.ipfs.w3s.link/School.jpg"
const imageSoft = "https://bafybeigsa4lcv3mvemlnocgerre34w7lcfblcdmy5rh6oswbpbhnli4umm.ipfs.w3s.link/Soft.jpg"
const imageSunset = "https://bafybeifw4mg2mx5y4zxoc5oeauidsknuzpo3327aqma5n5yqj2zwwumzz4.ipfs.w3s.link/Sunset.jpg"

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
      genderCategory: "man",
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

  const showAlert = (icon, title, text) => {
    Swal.fire({ icon, title, text, confirmButtonText: "OK" });
  };

  const handleFileChange = async (event) => {
    const base64Astronout = await convertImageToBase64(imageAstronout);
    const base64Backpacker = await convertImageToBase64(imageBackpacker);
    const { selectedStyle } = state;
    console.log("style ",selectedStyle.image)

    // console.log("Astronout Base64:", base64Astronout);
    console.log("Astronout Base64:", base64Astronout.length);
    // console.log("Backpacker Base64:", base64Backpacker);
    console.log("Backpacker Base64:", base64Backpacker.length);
    const file = event.target.files[0];
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

  const convertImageToPngBlob = async (fileOrBase64) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Jika input berupa File atau Blob, ubah jadi base64 URL
      const url = typeof fileOrBase64 === "string" && fileOrBase64.startsWith("data:")
        ? fileOrBase64
        : URL.createObjectURL(fileOrBase64);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Konversi ke blob dengan format PNG
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Gagal konversi gambar ke PNG"));
          }
        }, "image/png");
      };

      img.onerror = () => {
        reject(new Error("Gagal memuat gambar"));
      };

      img.src = url;
    });
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
      const blob = await convertImageToPngBlob(selectedFile);
      

      const storachaCid = await uploadBlobToStoracha(blob);
      const userImageUrl = `https://${storachaCid}.ipfs.w3s.link/`;
      console.log("userImageUrl:", userImageUrl);

      await uploadImageToBackend(userImageUrl);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        output: "An error occurred while uploading the image.",
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
      await refreshCredit();
    }
  };

  const base64ToBlob = (base64, type = "image/png") => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([byteNumbers], { type });
  };

  const uploadImageToBackend = async (imageUrl) => {
    try {
      const { selectedStyle } = state;

      console.log("imageUrl:", imageUrl);
      console.log("styleUrl:", selectedStyle.image);

      // // Fetch image utama
      // const imageRes = await fetch(imageUrl);
      // if (!imageRes.ok) throw new Error("Gagal fetch image utama");

      // const imageBuffer = await imageRes.arrayBuffer();
      // const imageUint8Array = new Uint8Array(imageBuffer);
      // console.log("imageuint : ", imageUint8Array)

      // // Fetch style image
      // const styleRes = await fetch(selectedStyle.image);
      // if (!styleRes.ok) throw new Error("Gagal fetch image style");

      // const styleBuffer = await styleRes.arrayBuffer();
      // const styleUint8Array = new Uint8Array(styleBuffer);
      // console.log("styleuint : ", styleUint8Array)


      // Kirim ke canister
      const response = await actor.send_http_post_request(
        imageUrl,
        selectedStyle.image
      );
      console.log("dari response backend",response);
      const jobIdText = new TextDecoder().decode(response);
      console.log("bawah jobtext",jobIdText);
      await pollUntilReady(jobIdText);
    } catch (error) {
    }
  };



  const pollUntilReady = async (jobId) => {
    const maxRetries = 30;
    const delay = 10000;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const result = await actor.check_style_status(jobId);
        console.log("result: ", result.status);
        if (result.status === "COMPLETED" && result.image) {

          const byteArray = result.image[0];
          const blob = new Blob([byteArray], { type: "image/png" });
          const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          setState((prev) => ({ ...prev, imageUrl: dataUrl }));
          const storachaResult = await uploadBlobToStoracha(blob);

          await actor.save_image_to_store(storachaResult.toString());
          return;
        } else if (result.status === "FAILED") {
          showAlert("error", "Error", "Image generation failed.");
          return;
        }
      } catch (error) {
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      attempt++;
    }
    showAlert("error", "Timeout", "Image generation took too long.");
  };

  const convertImageToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

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
          <div className="border-borderShade flex h-full w-full flex-col border-r-2 border-opacity-40 md:w-1/3 bg-secondaryColor">
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


                <div className="flex w-full max-w-max flex-col gap-4 text-white">
                  <p>Choose Style:</p>

                  <div className="relative flex w-fit mx-auto rounded-full bg-gray-800 p-1">
                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          selectedGenderCategory: "man",
                          selectedStyle: null,
                        }))
                      }
                      className={`relative z-10 flex items-center gap-1 px-5 py-2 text-sm font-bold rounded-full transition-colors ${state.selectedGenderCategory === "man"
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

                    <button
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          selectedGenderCategory: "woman",
                          selectedStyle: null,
                        }))
                      }
                      className={`relative z-10 flex items-center gap-1 px-5 py-2 text-sm font-bold rounded-full transition-colors ${state.selectedGenderCategory === "woman"
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
                                  selectedStyle: style,
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

          <div className="h-full w-full md:w-2/3 block">
            <div className="flex flex-col h-full items-center mt-10 m-4 md:mx-0">
              <p className="text-white font-semibold mb-10">Image</p>

              <div className="w-full md:max-w-[30rem] aspect-square flex flex-col items-center justify-center rounded-lg transition duration-100 border border-neutral-500/30 hover:border-neutral-500/25 bg-gradient-to-b from-neutral-800/40 via-neutral-800/20 shadow-xl shadow-accentColor2/5 p-2 group">
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
