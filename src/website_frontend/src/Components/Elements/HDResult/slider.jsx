import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { FaArrowsLeftRight } from "react-icons/fa6";

import HdAfter from "../../../assets/images/features/hd/after.png";
import HdBefore from "../../../assets/images/features/hd/before.png";

const BeforeAfterSlider = () => {
  const [rangeValue, setRangeValue] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const x = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 100, damping: 25 });

  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setConstraints({ left: 0, right: containerWidth });
    }
  }, [containerRef.current]);

  const handleChange = (event) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    springX.set(value);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const value =
        ((event.clientX - containerRef.current.getBoundingClientRect().left) /
          containerRef.current.offsetWidth) *
        100;
      setRangeValue(Math.min(Math.max(value, 0), 100));
      springX.set(rangeValue);
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {isDragging && (
        <div className="h-1/12 absolute bottom-4 z-20 flex w-10/12 justify-between px-2 text-center font-semibold">
          <span className="text-primaryColor bg-fontPrimaryColor left-0 z-40 rounded-full px-3 py-1 text-xs md:text-base">
            Before
          </span>
          <span className="text-primaryColor bg-fontPrimaryColor right-0 z-40 rounded-full px-3 py-1 text-xs md:text-base">
            After
          </span>
        </div>
      )}
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          paddingBottom: "56.25%",
          position: "relative",
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          className="absolute left-0 top-0 h-full w-full select-none"
          style={{
            clipPath: `inset(0 ${100 - rangeValue}% 0 0)`,
            overflow: "hidden",
          }}
        >
          <img
            src={HdBefore}
            alt="Before"
            className="h-full w-full rounded-lg object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute left-0 top-0 h-full w-full select-none"
          style={{
            clipPath: `inset(0 0 0 ${rangeValue}%)`,
            overflow: "hidden",
          }}
        >
          <img
            src={HdAfter}
            alt="After"
            className="h-full w-full rounded-lg object-cover"
          />
        </motion.div>

        <input
          type="range"
          min={0}
          max={100}
          value={rangeValue}
          onChange={handleChange}
          className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform"
          style={{
            appearance: "none",
            backgroundColor: "transparent",
            cursor: "ew-resize",
          }}
        />
        <div
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: 0,
            left: `${rangeValue}%`,
            width: 4,
            height: "100%",
          }}
        />
        <div
          style={{
            backgroundColor: "#fff",
            pointerEvents: "none",
            position: "absolute",
            top: "50%",
            left: `${rangeValue}%`,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaArrowsLeftRight className="text-primaryColor" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
