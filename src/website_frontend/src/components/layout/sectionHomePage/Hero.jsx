import {React, useState} from "react";
import { useAuth } from "../../../provider/authProvider";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../variants";

import Swal from "sweetalert2";
import Button from "../../ui/Button";
// import HeroImage from "../../../assets/images/hero/hero-image.png";

import CardNotification from "../CardNotification";


const HeroImage =
  "https://bafybeifce6nvn6iimmpuptc4irh5erb4u6um5u2jhhzhjsuizey4vfyhq4.ipfs.w3s.link/hero-image.png";

const Hero = () => {
  const { Login, isLoggedIn } = useAuth();
  const [showWalletNotification, setShowWalletNotification] = useState(false);



  const handleNavigationGenerate = () => {
    if (isLoggedIn) {
      window.location.href = "/generate";
    } else {
      setShowWalletNotification(true);
    }
  };

  return (
    <>
      <main className="bg-primaryColor flex flex-col items-center justify-center gap-y-20 md:h-screen md:flex-row md:gap-y-0">
        <div className="relative z-10 h-auto w-auto items-center justify-center space-y-6 overflow-visible px-6 md:absolute md:grow md:translate-y-24">
          <motion.div
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="z-0 size-full justify-items-center text-center"
          >
            <img src={HeroImage} alt="Hero Image" className="z-0 select-none" />
            <div className="absolute z-1 bottom-0 bg-gradient-to-t from-primaryColor via-primaryColor/90 to-transparent h-[35%] w-full"></div>
          </motion.div>
        </div>

        <div className="z-50 mx-auto mt-8 flex flex-col items-start gap-10 space-y-6 px-6 md:mt-0 md:scroll-pt-3.5 md:flex-row md:justify-between md:space-y-0 md:px-16">
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

        {showWalletNotification && (
          <CardNotification
            title="Login Required"
            message="Please login to your Plug Wallet"
            description="You need to be logged in to your Plug Wallet before connecting and using this feature."
            actionUrl={() =>  Login()}
            actionLabel="Login to Plug Wallet"
            onClose={() => setShowWalletNotification(false)}
          />
        )}
      </main>
    </>
  );
};

export default Hero;
