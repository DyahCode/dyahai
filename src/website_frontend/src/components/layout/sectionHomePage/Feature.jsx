import React, { useState } from "react";
import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BeforeAfterSlider from "../../ui/HDResult/slider";
import { useAuth } from "../../../provider/authProvider";
import ContainerBox, { BackdropBox, Box, ClearBox, Container } from "../Container";
import { usePopup } from "../../../provider/PopupProvider";
import HeadSection from "../HeadSection";
import HowItWorks from "../../ui/HIW/HowItWorks";
import ArtStylesSlider from "../../ui/ArtStyles";

const AISectionImage1 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/AI-image-1.webp";
const AISectionImage2 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/AI-image-2.webp";
const AISectionImage3 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/AI-image-3.webp";
const AISectionImage4 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/AI-image-4.webp";


const Feature = () => {
  const ref = React.useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, Login } = useAuth();
  const { showPopup, hidePopup } = usePopup();
  const { scrollY } = useScroll();

  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const transition = { duration: 1.2, ease: "easeOut" };

  const leftVariant = {
    hidden: { scale: 1, rotate: 0, opacity: 0.8 },
    visible: { scale: 1.25, rotate: -5, opacity: 1, transition },
  };

  const rightVariant = {
    hidden: { scale: 1, rotate: 0, opacity: 0.8 },
    visible: { scale: 1.25, rotate: 5, opacity: 1, transition },
  };

  const handleNavigationGenerate = () => {
    if (isLoggedIn) {
      navigate("/generate");
    } else {
      showPopup({
        title: "Login Required",
        message: "To use this feature, please log in first. Once you are logged in, you can connect and continue using this feature.",
        type: "warning",
        leftLabel: "Login",
        onLeft: () => { Login() },
        rightLabel: "Cancel",
        onRight: () => { hidePopup() },
      });
    }
  };

  return (
    <>
      <section
        id="feature"
        className="z-[20] w-full space-y-10 scroll-mt-[250px]"
      >
        {/* section 1 */}
        <HeadSection >
          <div className="relative w-full flex flex-col items-center ">
            <span className="absolute -top-12 w-full text-center text-[4rem] md:text-[12rem]  font-semibold leading-[16rem] bg-gradient-to-b from-n-1/10 via-n-1/[7.5%] to-n-1/[0.5%]  bg-clip-text text-transparent">
              DyahAI
            </span>
            <span className="relative h2 text-n-2 drop-shadow-[0px_0px_25px_rgba(29,93,77,0.6)]">
              We’re DyahAI. <br />Transforming complex digital creation into instant artistic expression.
            </span>
          </div>
        </HeadSection>

        <ContainerBox g boxClass="relative">
          <div ref={ref} className="w-full flex flex-col relative">

            {/* image */}
            <div className="absolute w-full h-full flex justify-between top-[0%] overflow-hidden">
              {/* left */}
              <div className="relative flex w-[30%] h-full justify-start"
                style={{
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0) 100%)",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "cover",
                  WebkitMaskSize: "cover",
                }}>
                <motion.div
                  className="absolute flex w-[50%] top-[10%] left-[45%]"
                  variants={leftVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}>
                  <img src={AISectionImage1} className="z-2 rounded-lg object-fill" />
                </motion.div>
                <motion.div
                  className="absolute flex w-[60%] top-[5%] left-[0%] rounded-lg overflow-hidden"
                  variants={leftVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <img src={AISectionImage2} className="z-3 object-fill" />
                </motion.div>
              </div>
              {/* right */}
              <div className="relative flex w-[30%] h-full justify-end"
                style={{
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,1) 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.95) 55%, rgba(0,0,0,1) 100%)",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskSize: "cover",
                  WebkitMaskSize: "cover",
                }}>
                <motion.div
                  className="absolute flex w-[50%] top-[10%] right-[45%]"
                  variants={rightVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}>
                  <img src={AISectionImage3} className="z-2 rounded-lg object-fill" />
                </motion.div>
                <motion.div
                  className="absolute flex w-[60%] top-[5%] right-[0%]"
                  variants={rightVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}>
                  <img src={AISectionImage4} className="z-3 rounded-lg object-fill" />
                </motion.div>
              </div>
            </div>

            {/* text center */}
            <div className="relative z-5 left-0 w-full px-10 md:px-20 lg:px-40 flex flex-col items-center text-center mt-[7.5rem] mb-[6rem] ">
              <h2 className="h2 mb-12 w-[80%] text-n-1">
                A New Journey<br />of AI Image Generation<br />in the Web 3.0 Era
              </h2>
              <h5 className="h5 text-n-3">
                DyahAI’s generative model solves the complexity of digital art creation by allowing users to transform images into artistic styles instantly — without expensive tools, long processing times, or high-end hardware.
              </h5>
            </div>
          </div>

          <HowItWorks />

        </ContainerBox>

        {/* section 3 benefits */}
        <Container className="flex flex-col justify-center space-y-10 md:space-y-10">
          {/* HD Image features */}
          <div className="w-full h-fit flex flex-col lg:flex-row my-10 px-10 gap-4 md:gap-0">
            <div className="mt-16 max-lg:order-first lg:pr-10 flex h-fit lg:w-[40%] flex-col text-left">
              <h3 className="h3 font-medium text-n-1 mb-8">
                HD Resolution Image
              </h3>
              <p className="body-1 text-n-1/60 text-balance">
                DyahAI brings your vision to life in stunning HD clarity — every pixel crafted with precision and every detail brought to life. Experience ultra-sharp, vibrant results perfect for sharing, printing, or showcasing.
              </p>
            </div>

            <div className="lg:w-[45em] w-full h-full items-center justify-center overflow-hidden border border-n-1/10 rounded-3xl relative">
              <div className="absolute -bottom-[180px] lg:-bottom-[300px] z-0 w-full scale-[190%] pointer-events-none select-none">
                <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/background/gradient-bubble.webp" alt="" className="object-fill" />
              </div>

              <div className="w-full flex pt-10 px-8 lg:pt-20 lg:px-16">

                <div className="relative z-1 w-full border-2 border-b-0 border-n-1/10 rounded-ss-xl rounded-se-xl overflow-hidden">
                  <BeforeAfterSlider />
                </div>
              </div>
            </div>
          </div>

          {/* Free To Use */}
          <div className="w-full h-fit flex flex-col lg:flex-row my-10 px-10 max-lg:gap-y-8">
            <div className="lg:w-[45em] w-full h-fit items-center overflow-hidden border border-n-1/10 rounded-3xl relative">
              <div className="absolute -bottom-[180px] lg:-bottom-[300px] z-0 w-full scale-[190%] pointer-events-none select-none">
                <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/background/gradient-bubble.webp" alt="" className="object-fill" />
              </div>
              <div className="w-full flex pt-10 px-8 lg:pt-20 lg:px-16">
                <div className="relative z-1 w-full border-2 border-b-0 border-n-1/10 rounded-ss-xl rounded-se-xl overflow-hidden">
                  <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/generation-process-animation.gif" alt="AI Generation Process" className="object-fill" />
                </div>
              </div>
            </div>

            <div className="mt-16 max-lg:order-first lg:pl-10 flex h-fit lg:w-[40%] flex-col text-left">
              <h3 className="h3 font-medium text-n-1 mb-8">
                Free-To-Use
              </h3>
              <p className="body-1 text-n-1/60 text-balance">
                Experience our AI realism — free to use, fully yours during the trial. Dive in, explore limitless creativity, and see how real your imagination can become.
              </p>
            </div>
          </div>

          {/* Various Artworks Style */}
          <div className="w-full h-fit flex flex-col lg:flex-row my-10 px-10 gap-4 md:gap-0">
            <div className="mt-16 max-lg:order-first lg:pr-10 flex h-fit lg:w-[40%] flex-col text-left">
              <h3 className="h3 font-medium text-n-1 mb-8">
                Art Style Fusion
              </h3>
              <p className="body-1 text-n-1/60 text-balance">
                Turn your ideas into art across limitless styles.
                Whether it’s surreal, classic, or futuristic, DyahAI lets you craft, enhance, and refine every pixel. With tools for cropping and image-to-image enhancement, your creativity knows no limits.
              </p>
            </div>

            <div className="lg:w-[45em] w-full h-full items-center justify-center overflow-hidden border border-n-1/10 rounded-3xl relative">
              <div className="absolute -bottom-[180px] lg:-bottom-[300px] z-0 w-full scale-[190%] pointer-events-none select-none">
                <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/background/gradient-bubble.webp" alt="" className="object-fill" />
              </div>

              <div className="w-full flex pt-10 px-8 lg:pt-20 lg:px-16">
                <div className="relative z-1 w-full border-2 border-b-0 border-n-1/10 rounded-ss-xl rounded-se-xl overflow-hidden">
                  <ArtStylesSlider />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section >
    </>
  );
};

export default Feature;
