import React from "react";
import { useAuth } from "../../../Hooks/authHook";

import Button from "../../Elements/Button";
import Swal from "sweetalert2";

import avatar1 from "../../../assets/images/about/image-gallery-1.jpeg";
import avatar2 from "../../../assets/images/about/image-gallery-2.jpeg";
import avatar3 from "../../../assets/images/about/image-gallery-3.jpeg";

const About = () => {
  const { Login, isLoggedIn } = useAuth();

  const itemTestimony = [
    {
      message:
        "DyahAI is simply amazing! It brings my creative visions to life with stunning realism—like nothing I've used before!",
      name: "Bayu Anggoro Sunu",
      avatar: avatar1,
    },
    {
      message:
        "Incredible experience! The AI feels intuitive, and the images are breathtakingly detailed. DyahAI truly exceeded my expectations.",
      name: "Anoeloeby",
      avatar: avatar2,
    },
    {
      message:
        "DyahAI combines power and simplicity. With just a few clicks, I get professional level visuals. Absolutely game-changing!",
      name: "Wahyu Adi Pratama",
      avatar: avatar3,
    },
  ];
  const handleGenerateClick = () => {
    if (isLoggedIn) {
      window.location.href = "/generate";
    } else {
      Swal.fire({
        title: "Please log in",
        text: "You need to log in to access the Generate feature.",
        icon: "warning",
        confirmButtonText: "Log In",
      }).then((result) => {
        if (result.isConfirmed) {
          Login();
        }
      });
    }
  };
  return (
    <>
      <section
        id="about"
        className="bg-primaryColor text-fontPrimaryColor scroll-mt-20"
      >
        <div className="container mx-auto my-auto flex h-full w-full flex-col items-center justify-center gap-y-10 px-0 text-center md:px-8">
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 px-8 py-12 text-center">
            <h1 className="text-3xl font-black md:text-7xl">
              DyahAI Image Generator
            </h1>
            <p className="text-fontPrimaryColor text-center text-xl leading-relaxed md:px-10">
              DyahAI elevates your imagination, transforming each idea into a
              striking, creative masterpiece that exceeds your wildest dreams.
              Powered by cutting-edge AI and secured with blockchain Web 3.0,
              DyahAI opens a new frontier in visual creation—where your vision
              comes to life with just a few clicks.
            </p>
          </div>
          <div className="divide-borderShade flex h-full w-full flex-row items-center justify-center gap-y-10 divide-x px-4 py-12 text-center md:px-20">
            {itemTestimony.map((item, index) => (
              <div key={index} className="space-y-5 md:px-5">
                <p className="text-sm font-extralight italic">{item.message}</p>
                <div className="flex items-center justify-center gap-x-4">
                  <img
                    src={item.avatar}
                    alt={`user-review-${index}`}
                    className="h-8 w-8 rounded-full"
                  ></img>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="z-10 text-lg font-bold italic">
            Bring Your Imagination to Life with DyahAI Realistic Image
            Generator.
          </p>
          <Button onClick={handleGenerateClick} variant="primary">
            Try Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default About;
