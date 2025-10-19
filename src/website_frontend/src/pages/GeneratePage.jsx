import React, { useState } from "react";
import { useAuth } from "../provider/authProvider";
import {
  uploadBlobToStoracha,
  removeContentFromStoracha,
} from "../hooks/authStoracha";
import PaymentSnap from "../components/ui/PaymentSnap";
import Button from "../components/ui/Button";
import Loader from "../components/layout/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { IoMdDownload } from "react-icons/io";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import Navbar from "../components/layout/Navbar";
import { usePopup } from "../provider/PopupProvider";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Principal } from "@dfinity/principal";
import { BurnTokens } from "../hooks/wallet";
import MintingSnap from "../components/ui/MintingSnap";

const imageAstronout =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Astronout.webp";
const imageBackpacker =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Backpacker.webp";
const imageCyberpunk =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Cyberpunk.webp";
const imageDreamworks =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Dreamworks.webp";
const imageRenaissance =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Renaissance.webp";
const imageSteampunk =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Steampunk.webp";
const imageStreetwear =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Streetwear.webp";
const imageWasteland =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Wasteland.webp";
const imageComic =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Comic.webp";
const imageAsian =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Asian.webp";
const imagePixel =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Pixel.webp ";
const imageCartoon =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Cartoon.webp";
const imageRenaissance2 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Renaissance2.webp";
const imageManga =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Manga.webp";
const imagePhoto =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Photo.webp";
const imageDenim =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Denim.webp";
const imageTshirt =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/T-Shirt.webp";
const imageWhitedress =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/White Dress.webp";
const imageHoodie =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/man/Hoodie.webp";

const imageArtisticW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Artistic.webp";
const imageCyberpunkW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Cyberpunk.webp";
const imageDreamy =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Dreamy.webp";
const imageFashion =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Fashion.webp";
const imageKorean =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Korean.webp";
const imageNature =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Nature.webp";
const imageRenaissanceW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Renaissance.webp";
const imageRetroW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Retro.webp";
const imageSchool =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/School.webp";
const imageSunset =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Sunset.webp";
const imagePixelW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Pixel.webp";
const imageAsianW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Asian.webp";
const imageCartoonW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Cartoon.webp";
const imageMangaW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Manga.webp";
const imageRenaissanceW2 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Renaissance2.webp";
const imagePhotoW =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/art-styles-models/women/Photo.webp";

const GeneratePage = () => {
  const {
    credit,
    principalId,
    isLoggedIn,
    Login,
    Logout,
    refreshCredit,
    tier,
    actor,
    actorLedger,
    authClient,
  } = useAuth();

  const navigate = useNavigate();

  // Popup State
  const { showPopup, hidePopup } = usePopup();

  // Minting State
  const [showMintingSnap, setShowMintingSnap] = useState(false);

  // Dragging Image State
  const [isDragging, setIsDragging] = useState(false);

  // Image Ganerate State
  const [state, setState] = useState({
    isLoading: false,
    selectedFile: null,
    output: "",
    imageUrl: "",
    selectedStyle: "",
    selectedGenderCategory: "man",
    balance: 0,
  });

  // Minting Metadata State
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

  // Payment Snap State
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [showInvoice, setShowInvoice] = useState(false);

  const [urlGenerateResult, setUrlGenerateResult] = useState(null);

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
      label: "Dreamworks",
      image: imageDreamworks,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageDreamworks);
        return await response.blob();
      },
    },
    {
      id: "5",
      label: "Renaissance",
      image: imageRenaissance,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageRenaissance);
        return await response.blob();
      },
    },
    {
      id: "6",
      label: "Steampunk",
      image: imageSteampunk,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageSteampunk);
        return await response.blob();
      },
    },
    {
      id: "7",
      label: "Streetwear",
      image: imageStreetwear,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageStreetwear);
        return await response.blob();
      },
    },
    {
      id: "8",
      label: "Wasteland",
      image: imageWasteland,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageWasteland);
        return await response.blob();
      },
    },
    {
      id: "9",
      label: "Comic",
      image: imageComic,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageComic);
        return await response.blob();
      },
    },
    {
      id: "10",
      label: "Asian",
      image: imageAsian,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageAsian);
        return await response.blob();
      },
    },
    {
      id: "11",
      label: "Pixel",
      image: imagePixel,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imagePixel);
        return await response.blob();
      },
    },
    {
      id: "12",
      label: "Cartoon",
      image: imageCartoon,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageCartoon);
        return await response.blob();
      },
    },
    {
      id: "13",
      label: "Manga",
      image: imageManga,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageManga);
        return await response.blob();
      },
    },
    {
      id: "14",
      label: "Renaissance 2",
      image: imageRenaissance2,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageRenaissance2);
        return await response.blob();
      },
    },
    {
      id: "15",
      label: "Photo",
      image: imagePhoto,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imagePhoto);
        return await response.blob();
      },
    },
    {
      id: "16",
      label: "T-Shirt",
      image: imageTshirt,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageTshirt);
        return await response.blob();
      },
    },
    {
      id: "17",
      label: "Hoodie",
      image: imageHoodie,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageHoodie);
        return await response.blob();
      },
    },
    {
      id: "18",
      label: "White Dress",
      image: imageWhitedress,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageWhitedress);
        return await response.blob();
      },
    },
    {
      id: "19",
      label: "Denim",
      image: imageDenim,
      genderCategory: "man",
      getFile: async () => {
        const response = await fetch(imageDenim);
        return await response.blob();
      },
    },
    {
      id: "20",
      label: "Artistic",
      image: imageArtisticW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageArtisticW);
        return await response.blob();
      },
    },
    {
      id: "21",
      label: "Cyberpunk",
      image: imageCyberpunkW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageCyberpunkW);
        return await response.blob();
      },
    },
    {
      id: "22",
      label: "Dreamy",
      image: imageDreamy,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageDreamy);
        return await response.blob();
      },
    },
    {
      id: "23",
      label: "Fashion",
      image: imageFashion,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageFashion);
        return await response.blob();
      },
    },
    {
      id: "24",
      label: "Korean",
      image: imageKorean,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageKorean);
        return await response.blob();
      },
    },
    {
      id: "25",
      label: "Nature",
      image: imageNature,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageNature);
        return await response.blob();
      },
    },
    {
      id: "26",
      label: "Renaissance",
      image: imageRenaissanceW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageRenaissanceW);
        return await response.blob();
      },
    },
    {
      id: "27",
      label: "Retro",
      image: imageRetroW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageRetroW);
        return await response.blob();
      },
    },
    {
      id: "28",
      label: "School",
      image: imageSchool,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageSchool);
        return await response.blob();
      },
    },
    {
      id: "29",
      label: "Sunset",
      image: imageSunset,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageSunset);
        return await response.blob();
      },
    },
    {
      id: "30",
      label: "Asian",
      image: imageAsianW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageAsianW);
        return await response.blob();
      },
    },
    {
      id: "31",
      label: "Pixel",
      image: imagePixelW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imagePixelW);
        return await response.blob();
      },
    },
    {
      id: "32",
      label: "Cartoon",
      image: imageCartoonW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageCartoonW);
        return await response.blob();
      },
    },
    {
      id: "33 ",
      label: "Manga",
      image: imageMangaW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageMangaW);
        return await response.blob();
      },
    },
    {
      id: "34",
      label: "Renaissance 2",
      image: imageRenaissanceW2,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imageRenaissanceW2);
        return await response.blob();
      },
    },
    {
      id: "35",
      label: "Photo",
      image: imagePhotoW,
      genderCategory: "woman",
      getFile: async () => {
        const response = await fetch(imagePhotoW);
        return await response.blob();
      },
    },
  ];

  // Function For Input Image
  const handleFileChange = async (event) => {
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

  // Function Core Generate
  const convertImageToPngBlob = async (fileOrBase64) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url =
        typeof fileOrBase64 === "string" && fileOrBase64.startsWith("data:")
          ? fileOrBase64
          : URL.createObjectURL(fileOrBase64);

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

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
    const { selectedFile, selectedStyle } = state;
    if (!selectedFile || !selectedStyle) {
      showPopup({
        title:
          !selectedFile && !selectedStyle
            ? "No Image and Style Selected"
            : !selectedFile
              ? "No Image Uploaded"
              : "No Style Selected",
        message:
          !selectedFile && !selectedStyle
            ? "Please upload an image and select a style before generating."
            : !selectedFile
              ? "Please upload an image first before generating."
              : "Please select a style first before generating.",
        type: "warning",
        leftLabel: "Ok",
        onLeft: () => {
          hidePopup();
        },
      });
      return;
    }

    const burning = async () => {
      setShowInvoice(true);
      setPaymentStatus("processing");

      if (authClient.provider !== "Plug") {
        const message = "Burned 1 DYA to generate image";

        return new Promise((resolve, reject) => {
          showPopup({
            title: "Confirm Transaction",
            message: `Type : Burn Token
            Amount : 1 DYA
            To : ${process.env.MINTER_PRINCIPAL_ID}
            Memo : ${message}`,
            extends: "message",
            extendMessage: [
              {
                Amount: "1 DYA",
                To: `${process.env.MINTER_PRINCIPAL_ID}`,
                Memo: `${message}`,
              },
            ],
            type: "default",
            leftLabel: "REJECT",
            onLeft: async () => {
              hidePopup();
              resolve(null);
              setPaymentStatus("failed");
            },
            rightLabel: "APPROVE",
            onRight: async () => {
              hidePopup();
              try {
                const burn = await BurnTokens(actorLedger);
                resolve(burn);
              } catch (err) {
                reject(err);
              }
            },
            onClose: async () => {
              hidePopup();
              resolve(null);
              setPaymentStatus("failed");
            },
          });
        });
      } else {
        const burn = await BurnTokens(actorLedger);
        return burn;
      }
    };

    const burn = await burning();
    console.log("Burn: ", burn);
    if (!burn || !burn.Ok) {
      setPaymentStatus("failed");
      return;
    }

    setPaymentStatus("success");
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const blob = await convertImageToPngBlob(selectedFile);

      const storachaCid = await uploadBlobToStoracha(blob);
      const userImageUrl = `https://${storachaCid}.ipfs.w3s.link/`;
      console.log("userImageUrl:", userImageUrl);
      console.log("storachaCid:", storachaCid);

      await uploadImageToBackend(userImageUrl, storachaCid);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        output: "An error occurred while uploading the image.",
      }));
    } finally {
      await refreshCredit();
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const generate = async (source, target) => {

    const url = "https://dyahai-proxy.vercel.app/style/run";
    const headers = {
      "Content-Type": "application/json",
      "X-Idempotency-Key": `${principalId}-${Date.now()}`,
    };

    const body = {
      input: {
        prompt: "a portrait of a human, looking directly at the camera",
        negative_prompt: "(deformed, blurry, long neck, bad collar, cgi, bad anatomy, big body)",
        face_image: source, 
        style_image: target, 
        num_inference_steps: 100,
        guidance_scale: 1.0,
        width: 512,
        height: 512,
      },
    };

    try {
      console.log("Sending request to RunPod API...");
    const response = await axios.post(url, body, { headers });

    return response.data;
    } catch (error) {
      console.error("RunPod API Error:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
      throw error;
    }
  };


  const uploadImageToBackend = async (imageUrl, cid) => {
    try {
      const { selectedStyle } = state;

      console.log("imageUrl:", imageUrl);
      console.log("styleUrl:", selectedStyle.image);
      console.log("cid img:", cid);
      console.log("actor from generate_page:", actor);
      console.log("function send http post request already to run >>>");
      const response = await generate(imageUrl, selectedStyle.image);

      console.log("response from backend >>>>>", response);

      if (!response.status == "COMPLETED") {
        showPopup({
          title: response.message || "We couldn't generate your image.",
          message:
            "Please try again. If it still doesn't work, reach out to our support team.",
          type: "warning",
          leftLabel: "Got it",
          onLeft: () => {
            hidePopup();
          },
        });
        return;
      }
      const base64Image =   response.output.image;


      if (!base64Image) {
        showPopup({
          title: "No image returned from backend.",
          message:
            "Please try again later or contact support if this keeps happening.",
          type: "warning",
          leftLabel: "Got it",
          onLeft: () => {
            hidePopup();
          },
        });
        return;
      }

      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const storachaResult = await uploadBlobToStoracha(blob);
      console.log("ini result", storachaResult.toString())
      console.log(`https://${storachaResult.toString()}.ipfs.w3s.link/`)
      const metadata = {
        id: storachaResult.toString(),
        name: `${selectedStyle.label} ${selectedStyle.genderCategory}`,
        description: "no description",
        assets: {
          url: `https://${storachaResult.toString()}.ipfs.w3s.link/`,
          mime: "image/png",
          purpose: ["icrc97:image"],
        },
        created_at_time: BigInt(Date.now() * 1_000_000),
        is_public: false,
        is_minted: false,
      };

      setMinting(metadata);
      await actor.save_image_to_store(metadata);

      const finalUrl = `https://${storachaResult.toString()}.ipfs.w3s.link/`;
      setState((prev) => ({ ...prev, imageUrl: dataUrl }));
      setUrlGenerateResult(finalUrl);

      await removeContentFromStoracha(cid.toString());
    } catch (error) {
      console.error("Error in uploadImageToBackend:", error);
      await removeContentFromStoracha(cid.toString());
      showPopup({
        title: "We couldn't generate your image.",
        message:
          "Please try again. If it still doesn't work, reach out to our support team.",
        type: "warning",
        leftLabel: "Got it",
        onLeft: () => {
          hidePopup();
        },
      });
      return;
    }
  };

  // Funtion FOr Download ang Minting
  const handleDownloadImage = () => {
    if (!state.imageUrl) {
      showPopup({
        title: "Image Not Found. We couldn't find the image.",
        message:
          "It looks like the image is missing or unavailable for download. Please generate a new one.",
        type: "warning",
        leftLabel: "Got it",
        onLeft: () => {
          hidePopup();
        },
      });
      return;
    }
    const link = document.createElement("a");
    link.href = state.imageUrl;
    console.log(state.imageUrl);
    link.download = "generated-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleMintingButton = () => {
    if (!urlGenerateResult) {
      showPopup({
        title: "Image Not Found. We couldn't find the image.",
        message:
          "It looks like the image is missing or unavailable for minting. Please generate a new one.",
        type: "warning",
        leftLabel: "Got it",
        onLeft: hidePopup,
      });

      setShowMintingSnap(false);
      return;
    }

    setShowMintingSnap(true);
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
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
              <div className="w-fit h-fit flex my-10 gap-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleDownloadImage}
                  className="text-fontPrimaryColor hover:bg-accentColor hover:text-primaryColor flex rounded-full w-40"
                >
                  <span>Download</span>
                  <IoMdDownload size={30} />
                </Button>
                <button
                  disabled={minting.is_minted}
                  onClick={handleMintingButton}
                  className="text-fontPrimaryColor bg:accentColor justify-center items-center text-bold text-lg hover:bg-accentColor hover:text-primaryColor flex rounded-full w-40 disabled:bg-fontPrimaryColor/10 disabled:text-fontPrimaryColor/60 disabled:cursor-not-allowed gap-2"
                >
                  <span>Minting</span>
                  <div className="h-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-full fill-current p-0.5"
                      viewBox="0 0 512 512"
                    >
                      <path d="M512 169.943c-50.296 12.033-91.653 12.632-127.443 7.49c-22.895 27.979-36.901 56.091-48.568 83.737c48.693-13.64 96.583-31.712 136.124-55.34c-42.697 31.493-92.067 53.554-141.817 69.276c-20.269 54.594-39.842 100.591-77.074 129.566c58.39-20.34 160.245-75.81 258.778-234.729m-263.637 219.67c80.103-69.55 48.78-188.267 203.384-290.824c-255.72-50.577-368.809 40.644-388.144 54.746c-103.994 75.841-56.637 198.26-24.04 169.647c53.276-46.09 133.296-158.44 286.56-198.737C186.999 162.294 88.86 295.126 63.094 328.528c-45.598 69.997 89.654 148.643 185.27 61.084" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
        <PaymentSnap
          paymentStatus={paymentStatus}
          setPaymentStatus={setPaymentStatus}
          showInvoice={showInvoice}
          setShowInvoice={setShowInvoice}
          authClient={authClient}
        />
        <MintingSnap
          showMintingSnap={showMintingSnap}
          setShowMintingSnap={setShowMintingSnap}
          actor={actor}
          principalId={principalId}
          minting={minting}
          setMinting={setMinting}
          setImages={urlGenerateResult}
          selectedIndex={urlGenerateResult}
          images={urlGenerateResult}
          authClient={authClient}
          actorLedger={actorLedger}
          credit={credit}
          refreshCredit={refreshCredit}
        />
      </main>
    </>
  );
};

export default GeneratePage;

// async function handleMintingNft(metadata) {
//   console.log("Metadata received for minting:", metadata);
//   const result = await MintNft(actor, principalId, {
//     id: metadata.id,
//     name: metadata.itemName,
//     description: metadata.itemDescription,
//     url: metadata.url,
//     mime: metadata.mime,
//   });
//   console.log("Mint Result", result);
//   if (result.Ok) {
//     showPopup({
//       title: "NFT Minted",
//       message: `The NFT has been minted successfully.<br>Nft ID:${Number(result.Ok[0].Ok)}`,
//       type: "success",
//       leftLabel: "Done",
//       onLeft: async () => {
//         hidePopup();
//       },
//     });
//   }
// }

// const convertImageToBase64 = async (imageUrl) => {
//   const response = await fetch(imageUrl);
//   const blob = await response.blob();

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };
