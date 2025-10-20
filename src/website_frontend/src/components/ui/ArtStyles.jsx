import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

const artStyles = [
  { name: "Artistic", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/artistic.webp" },
  { name: "Astronaut", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/astronout.webp" },
  { name: "Baroque", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/baroque.webp" },
  { name: "Cyberpunk", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/cyberpunk.webp" },
  { name: "Detective", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/detective.webp" },
  { name: "Dreamy", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/dreamy.webp" },
  { name: "Indigenous", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/indigenous.webp" },
  { name: "Renaissance", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/renaissance.webp" },
  { name: "School", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/school.webp" },
  { name: "Soldier", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/soldier.webp" },
  { name: "Steampunk", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/steampunk.webp" },
  { name: "Wasteland", image: "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/art-styles/wasteland.webp" },
];

const ArtStylesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalTime = 3500;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % artStyles.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-fit mx-auto overflow-hidden bg-n-6">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50 z-10" />

      <div className="relative w-full aspect-[16/9]">
        <AnimatePresence initial={false}>
          <motion.img
            key={artStyles[currentIndex].image}
            src={artStyles[currentIndex].image}
            alt={artStyles[currentIndex].name}
            className="absolute inset-0 w-full h-auto object-cover"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute flex bottom-6 left-6 z-20 bg-n-1/10 backdrop-blur-md px-4 py-3 rounded-xl h-fit items-center space-x-2">
        <div className="w-5 h-fit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-full">
            <path fill="currentColor" d="M12 16q-2.5 0-4.25-1.737T6 9.95Q6 8.1 7.1 6.475t2.413-2.85t2.4-1.925L13 1q0 1.425.513 2.4t1.937 2.075q1.475 1.15 2.013 2.138T18 9.95q0 2.575-1.75 4.313T12 16m-8 5l.55-1.625q.2-.625.725-1T6.45 18h11.1q.65 0 1.175.375t.725 1L20 21z" />
          </svg>
        </div>
        <motion.span
          key={artStyles[currentIndex].name}
          className="text-sm font-semibold"
          initial={{ opacity: 0.1, width: "0%" }}
          animate={{ opacity: 1, width: "100%" }}
          exit={{ opacity: 0.1, width: "0%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {artStyles[currentIndex].name}
        </motion.span>
      </div>


      <div className="absolute bottom-5 right-6 flex gap-2 z-20">
        {artStyles.map((_, index) => (
          <div
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-n-1" : "bg-n-1/20"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtStylesSlider;
