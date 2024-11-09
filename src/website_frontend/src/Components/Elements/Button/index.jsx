import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, onClick, iconButton, variant = "primary" }) => {
  let buttonClass;
  switch (variant) {
    case "primary":
      buttonClass =
        "bg-accentColor3 text-fontPrimaryColor z-[50] rounded-full px-4 py-3 text-sm font-bold hover:shadow-[0px_5px_30px_5px_rgba(32,_119,_116,_.75)] md:px-6 md:text-lg";
      break;
    case "primaryFull":
      buttonClass =
        "bg-accentColor3 text-fontPrimaryColor flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold md:px-6 md:text-lg";
      break;
    case "secondary":
      buttonClass =
        "text-fontPrimaryColor hover:border-fontPrimaryColor flex items-center justify-center border-b-2 border-transparent px-2 py-3 text-sm md:mx-4 md:text-lg";
      break;
    case "thirdFull":
      buttonClass =
        "bg-accentColor3 text-fontPrimaryColor flex w-2/3 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold hover:shadow-[0px_5px_30px_5px_rgba(32,_119,_116,_.75)] md:px-6 md:text-base";
      break;
    case "outline":
      buttonClass =
        "bg-secondaryColor border-borderShade text-fontPrimaryColor hover:bg-accentColor hover:border-accentColor flex items-center justify-center rounded-lg border border-opacity-50 px-4 py-2 font-bold";
      break;
    default:
      buttonClass =
        "bg-accentColor3 text-fontPrimaryColor flex items-center justify-center rounded-full px-4 py-3 text-sm font-bold hover:shadow-[0px_5px_30px_5px_rgba(32,_119,_116,_.75)] md:px-6 md:text-lg";
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.075 }}
      className={buttonClass}
    >
      {children}
      {iconButton}
    </motion.button>
  );
};

export default Button;
