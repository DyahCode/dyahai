import React from "react";

const HumbergerButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="flex md:hidden flex-col justify-center items-center gap-[14px] relative"
    >
      <span
        className={`block w-[28px] h-[3.5px] bg-white rounded-full transform transition-all duration-300 ease-in-out
              ${isOpen ? "scale-0" : "scale-100"}`}
      />
      <span
        className={`block w-[28px] h-[4px] bg-white rounded-full transition duration-300 ease-in-out absolute z-10
              ${isOpen ? "rotate-45" : ""}`}
      />
      <span
        className={`block w-[28px] h-[4px] bg-white rounded-full transition duration-300 ease-in-out absolute
              ${isOpen ? "-rotate-45" : ""}`}
      />
      <span
        className={`block w-[28px] h-[3.5px] bg-white rounded-full transform transition-all duration-300 ease-in-out
              ${isOpen ? "scale-0" : "scale-100"}`}
      />
    </button>
  );
};

export default HumbergerButton;
