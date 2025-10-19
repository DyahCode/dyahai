import React from "react";
import { motion } from "framer-motion";

const EcosystemSupport = ({ className }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      <h5 className="tagline text-center text-n-1/50">
        Grows together with
      </h5>

      {/* Wrapper animasi */}
      <div className="relative w-full overflow-hidden">
        <motion.ul
          className="flex gap-16 min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {[...supportLogos, ...supportLogos, ...supportLogos, ...supportLogos].map((logo, index) => (
            <li
              key={index}
              className="flex items-center justify-center flex-shrink-0 h-[6.5rem]"
            >
              <img
                src={logo}
                width={150}
                height={24}
                alt={`logo-${index}`}
                className="opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </li>
          ))}
        </motion.ul>

        {/* <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-primaryColor to-transparent z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-primaryColor to-transparent z-10" /> */}
      </div>
    </div>
  );
};

export default EcosystemSupport;

const supportLogos = [
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/assets/images/icon/internet-computer.png",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/assets/images/icon/WCHL-2025.webp",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/assets/images/icon/dfinity.png",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/assets/images/icon/WCHL-2025.webp",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/assets/images/icon/disruptives-icphubs.png",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/assets/images/icon/WCHL-2025.webp",
];
