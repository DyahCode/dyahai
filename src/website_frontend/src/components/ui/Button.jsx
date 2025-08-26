import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  isMotion = false,
}) => {
  const baseClass = "rounded-full font-bold transition-all focus:outline-none";
  const variantClass = {
    primary:
      "flex justify-center gap-2 items-center bg-accentColor3 text-fontPrimaryColor hover:shadow-[0px_5px_30px_5px_rgba(32,_119,_116,_.75)] z-[50] outline-none md:px-6 md:text-lg",
    secondary:
      "text-fontPrimaryColor border-b-2 border-transparent hover:border-fontPrimaryColor rounded-none outline-none text-sm md:text-lg font-normal z-[50]",
    outline:
      "flex justify-center gap-2 items-center bg-secondaryColor border border-borderShade text-fontPrimaryColor rounded-lg outline-none",
  };

  const sizeClass = {
    sm: "px-3 py-2 ",
    md: "px-4 py-2 ",
    lg: "px-8 py-3 ",
    icon: "px-4 py-2 gap-2",
  };

  if (isMotion) {
    return (
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.075 }}
        className={clsx(
          baseClass,
          variantClass[variant],
          sizeClass[size],
          className
        )}
      >
        {children}
      </motion.button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={clsx(
          baseClass,
          variantClass[variant],
          sizeClass[size],
          className
        )}
      >
        {children}
      </button>
    );
  }
};

export default Button;
