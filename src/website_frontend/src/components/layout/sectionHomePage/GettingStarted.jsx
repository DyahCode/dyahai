import React from "react";
import { motion } from "framer-motion";
import Button from "../../ui/Button";
import { usePopup } from "../../../provider/PopupProvider";
import { useAuth } from "../../../provider/authProvider";
import { useNavigate } from "react-router-dom";

const GettingStarted = () => {
  const { showPopup, hidePopup } = usePopup();
  const { isLoggedIn, Login } = useAuth();
  const navigate = useNavigate();

  const handleNavigationGenerate = () => {
    if (isLoggedIn) {
      navigate("/generate");
    } else {
      showPopup({
        title: "Login Required",
        message:
          "To use this feature, please log in first. Once you are logged in, you can connect and continue using this feature.",
        type: "warning",
        leftLabel: "Login",
        onLeft: () => {
          Login();
        },
        rightLabel: "Cancel",
        onRight: () => {
          hidePopup();
        },
      });
    }
  };

  return (
    <section className="flex w-full h-fit scroll-mt-20 mt-4 mb-0 relative overflow-hidden">
      <div className="container relative flex flex-col w-full z-10 justify-end ">
        <div className="z-2 relative flex flex-col text-center items-center pt-[18rem] mb-[15rem]">
          <h2 className="h2 z-1 mb-10">
            Turn ideas into masterpieces. <br /> Experience the power of DyahAI now.
          </h2>
          <Button onClick={handleNavigationGenerate}>Try Now</Button>
        </div>
      </div>

      <motion.img
        src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/background/end-gradient.webp"
        alt=""
        className="absolute bottom-0 left-0 z-0 w-full h-full object-cover pointer-events-none select-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.5, ease: "easeOut" }}
        viewport={{ once: false }}
      />
    </section>
  );
};

export default GettingStarted;
