import React from "react";
import { useToggleMenu } from "../../../Hooks/useTogglemenu";

const HumbergerButton = () => {
  const { isOpen, toggleMenu } = useToggleMenu();
  return (
    <button
      onClick={toggleMenu}
      className="group h-[36px] w-[36px] rounded-lg bg-transparent text-white md:hidden"
    >
      <div className="grid justify-items-center gap-1.5">
        <span
          className={`h-1 w-5 rounded-full bg-white transition ${isOpen ? "translate-y-2.5 rotate-45" : ""}`}
        ></span>
        <span
          className={`h-1 w-5 rounded-full bg-white transition ${isOpen ? "scale-x-0" : ""}`}
        ></span>
        <span
          className={`h-1 w-5 rounded-full bg-white transition ${isOpen ? "-translate-y-2.5 -rotate-45" : ""}`}
        ></span>
      </div>
    </button>
  );
};

export default HumbergerButton;
