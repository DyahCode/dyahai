import { useState } from "react";

export const useToggleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return { isOpen, toggleMenu };
};
