import React, { useEffect } from "react";
import { motion } from "framer-motion";

const loaderVariants = {
  animationOne: {
    x: [-30, 40, -30],
    y: [0, -50, 0],
    opacity: [1, 0.2, 1],
    transition: {
      x: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
      y: {
        repeat: Infinity,
        duration: 0.75,
        ease: "easeOut",
      },
      opacity: {
        repeat: Infinity,
        duration: 0.75,
        ease: "easeIn",
      },
    },
  },
  animationTwo: {
    x: [30, -40, 30],
    y: [0, -50, 0],
    opacity: [1, 0.2, 1],
    transition: {
      x: {
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      },
      y: {
        repeat: Infinity,
        duration: 0.75,
        ease: "easeOut",
      },
      opacity: {
        repeat: Infinity,
        duration: 0.75,
        ease: "easeIn",
      },
    },
  },
};

const Loader = () => {
  useEffect(() => {
    // Disable scroll saat loader aktif
    document.body.style.overflow = "hidden";

    // Aktifkan scroll lagi saat komponen di-unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-primaryColor fixed z-[999] flex h-screen w-screen select-none flex-col items-center justify-center bg-opacity-50 text-center top-0 left-0 ">
      <div className="bg-primaryColor flex h-[25rem] w-[35rem] flex-col items-center justify-center rounded-lg border-2  border-borderShade">
        <div className="flex flex-row">
          <motion.div
            variants={loaderVariants}
            animate="animationOne"
            className="bg-fontPrimaryColor m-4 h-3 w-3 rounded-full"
          ></motion.div>
          <motion.div
            variants={loaderVariants}
            animate="animationTwo"
            className="bg-fontPrimaryColor m-4 h-3 w-3 rounded-full"
          ></motion.div>
        </div>
        <p className="text-fontPrimaryColor text-lg">Wait a Minute</p>
      </div>
    </div>
  );
};

export default Loader;
