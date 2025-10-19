import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Coins3DScrollTrigger({
  logo,
  size = 200,
  thickness = 20,
  containerRef
}) {
  const [rotate, setRotate] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  const rotateY = useTransform(smoothProgress, [0, 1], [-20, -5]);
  const rotateX = useTransform(smoothProgress, [0, 1], [10, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [0.9, 1]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (v > 0.1 && !rotate) setRotate(true);
      else if (v < 0.05 && rotate) setRotate(false);
    });
    return () => unsubscribe();
  }, [rotate, smoothProgress]);

  const frontZ = Math.round(thickness / 2 + 2);
  const logoZ = frontZ + 6;

  return (
    <section className="relative flex items-center justify-center">
      <motion.div
        className="absolute z-2 top-[5vh] flex items-center justify-center"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          rotateY,
          rotateX,
          scale,
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full flex"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* DYA Tokenomics (SVG) */}
          <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/DYA-tokenomics.svg" alt="" />
        </motion.div>
      </motion.div>
      <div className="relative z-1 pointer-events-none select-none w-[28rem] -translate-y-8">
        <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/background/abstract-coins.webp" alt="" className="object-fill" />
      </div>
    </section >
  );
}
