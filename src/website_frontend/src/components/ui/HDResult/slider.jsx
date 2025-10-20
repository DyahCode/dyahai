import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent, animate } from "framer-motion";

const HdAfter = "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/hd-after.webp"
const HdBefore = "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/features/hd-before.webp"

const BeforeAfterSlider = () => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [range, setRange] = useState(25);
  const [isDragging, setIsDragging] = useState(false);


  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const rangeValue = useTransform(x, [0, containerWidth], [0, 100]);

  useMotionValueEvent(rangeValue, "change", (latest) => {
    setRange(Math.min(Math.max(latest, 0), 100)); 
  });

  useEffect(() => {
    if (containerRef.current && containerWidth > 0) {
      x.set(containerWidth * 0.40);
    }
  }, [containerWidth, x]);

  const labelOpacity = isDragging ? 1 : 0;

  return (
    <div className="relative flex w-full items-center justify-center group">
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl overflow-hidden"
        style={{ paddingBottom: "56.25%" }}
      >
        {/* BEFORE */}
        <motion.div
          className="absolute inset-0 select-none pointer-events-none"
          style={{
            clipPath: `inset(0 ${100 - range}% 0 0)`,
          }}
        >
          <img
            src={HdBefore}
            alt="Before"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 select-none pointer-events-none"
          style={{
            clipPath: `inset(0 0 0 ${range}%)`,
          }}
        >
          <img
            src={HdAfter}
            alt="After"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={false}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false);
            if (range < 5) x.set(containerWidth * 0.01);
            if (range > 95) x.set(containerWidth * 0.98);
          }}
          style={{ x }}
          className="absolute top-0 z-10 h-full w-2 cursor-ew-resize justify-center px-1"
        >
          <div className="absolute z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-n-1 shadow-md transition-opacity duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-n-5/85 group-hover:stroke-n-5 stroke-[2.5px] fill-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-5.625-6m5.625 6l-5.625 6"
              />
            </svg>
          </div>
          <div className="absolute z-0 bg-n-1/85 group-hover:bg-n-1 h-full w-2 left-1/2 -translate-x-1/2 transition-all duration-200">

          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: labelOpacity }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 flex w-10/12 justify-between px-2 font-semibold">
        <span className="rounded-full bg-fontPrimaryColor px-3 py-1 text-xs md:text-base text-primaryColor">
          Before
        </span>
        <span className="rounded-full bg-fontPrimaryColor px-3 py-1 text-xs md:text-base text-primaryColor">
          After
        </span>
      </motion.div>
    </div>
  );
};

export default BeforeAfterSlider;
