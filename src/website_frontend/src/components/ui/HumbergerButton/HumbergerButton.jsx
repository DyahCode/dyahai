import React from "react";
import { useToggleMenu } from "../../../hooks/useTogglemenu";

const HumbergerButton = () => {
  const { isOpen, toggleMenu } = useToggleMenu();
  return (
    // <button
    //   onClick={toggleMenu}
    //   className="group h-[36px] w-[36px] rounded-lg bg-transparent text-white md:hidden"
    // >
    //   <div className="grid justify-items-center gap-1.5">
    //     <span
    //       className={`h-1 w-5 rounded-full bg-white transition ${isOpen ? "translate-y-2.5 rotate-45" : ""}`}
    //     ></span>
    //     <span
    //       className={`h-1 w-5 rounded-full bg-white transition ${isOpen ? "scale-x-0" : ""}`}
    //     ></span>
    //     <span
    //       className={`h-1 w-5 rounded-full bg-white transition ${isOpen ? "-translate-y-2.5 -rotate-45" : ""}`}
    //     ></span>
    //   </div>
    // </button>

    <button
      onClick={toggleMenu}
      className="flex md:hidden flex-col justify-center items-center gap-[16px] relative"
    >
      <span
        className={`block w-[28px] h-[4px] bg-white rounded-full transform transition-all duration-300 ease-in-out
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
        className={`block w-[28px] h-[4px] bg-white rounded-full transform transition-all duration-300 ease-in-out
              ${isOpen ? "scale-0" : "scale-100"}`}
      />
    </button>
  );
};

export default HumbergerButton;
