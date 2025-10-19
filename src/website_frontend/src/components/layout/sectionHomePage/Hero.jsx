import { React, useState } from "react";
import { useAuth } from "../../../provider/authProvider";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/variants";

import Button from "../../ui/Button";
import { usePopup } from "../../../provider/PopupProvider";
import { useNavigate } from "react-router-dom";


const HeroImage =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/hero-image.webp";

const Hero = () => {
  const navigate = useNavigate();
  const { Login, isLoggedIn } = useAuth();
  const { showPopup, hidePopup } = usePopup();

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
      <main className="bg-primaryColor flex flex-col items-center justify-center gap-y-20 md:h-full md:gap-y-0 relative">

        {/* Hero Image */}
        <div className="relative md:min-h-screen h-full w-full items-center justify-center space-y-6 overflow-visible px-6 md:grow md:-top-[4rem] lg:-top-[10rem] xl:-top-[16rem]">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="z-0 size-full justify-items-center text-center p-0.5"
          >
            <img src={HeroImage} alt="Hero Image" className="z-0 select-none" />
            <div className="absolute z-0 bottom-0 bg-gradient-to-t from-primaryColor via-primaryColor/95 to-transparent h-[22.5%] w-full translate-y-10"></div>
          </motion.div>
        </div>

        {/* Hero Title */}
        <div className="w-dvw h-full md:h-[100vh] place-content-center md:absolute top-0 z-50">

          <div className="translate-y-6 mx-auto flex flex-col items-start gap-10 space-y-6 px-6 md:mt-0 md:scroll-pt-3.5 md:flex-row md:justify-between md:space-y-0 md:px-16">
            <motion.div
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full space-y-6 border-black text-center md:w-1/3 md:text-left"
            >
              <h1 className="text-accentColor2 text-3xl font-black tracking-wide md:text-5xl">
                Endless AI
              </h1>
              <p className="text-fontPrimaryColor text-base md:text-2xl">
                Unleash the power of generative AI in your visuals, journeying
                into a realm of boundless imagination.
              </p>
              <div className="flex justify-center gap-x-6 md:justify-start md:gap-x-4">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNavigationGenerate}
                  isMotion
                >
                  Generate
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => (window.location.href = "#feature")}
                  isMotion
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="w-full space-y-4 border-black text-center md:w-1/3 md:text-right"
            >
              <h2 className="text-accentColor2 text-3xl font-black tracking-wide md:text-5xl">
                Try it Yourself !
              </h2>
              <p className="text-fontPrimaryColor text-base md:text-2xl">
                Create stunning AI images now with Generative DyahAI. Join us and
                generate extraordinary visuals together!
              </p>
              <div className="flex justify-center md:justify-end items-center">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNavigationGenerate}
                  isMotion
                >
                  Try Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
