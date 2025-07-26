import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import Button from "../../ui/Button";
import Swal from "sweetalert2";


const avatar1 = "https://bafybeifd7wtlh57fd7sfynkpupg625gp6cbno3kplxiardb5i7aa5zxp6y.ipfs.w3s.link/image-gallery-1.jpg"
const avatar2 = "https://bafybeibopoqhuobckaaquqk6n4aikktqepiyht4pwhbapevkzreshyt7pq.ipfs.w3s.link/image-gallery-2.jpg"
const avatar3 = "https://bafybeigjfhem4jjxlqu5vtzxw2kb27u2otgkdp2h27hk7gnv6sgcx4miz4.ipfs.w3s.link/image-gallery-3.jpg"

const About = ({ Login, isLoggedIn }) => {
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth / 3;
      setItemWidth(width);
    }

    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth / 3;
        setItemWidth(width);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const x = useMotionValue(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [position, setPosition] = useState(1);
  const duplicatedItems = [...itemTestimony, ...itemTestimony];
  const halfLength = duplicatedItems.length / 2;


  const updatePosition = async (nextPos) => {
    await animate(x, -nextPos * itemWidth, {
      duration: 0.6,
      ease: "easeInOut",
    });

    if (nextPos >= halfLength) {
      await x.set(0);
      setPosition(0);
    } else {
      setPosition(nextPos);
    }
  };

  useEffect(() => {
    if (itemWidth === 0) return;

    const interval = setInterval(() => {

      updatePosition(position + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [position, itemWidth]);

  const handleNavigationGenerate = () => {
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

          <div className="container relative p-0 overflow-hidden w-full h-fit py-10 items-center" ref={containerRef}>
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-primaryColor to-transparent z-10" />

            <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-primaryColor to-transparent z-10" />

            <motion.div
              style={{ x }}
              className="flex"
            >
              {duplicatedItems.map((item, idx) => {
                const offset = idx * itemWidth;

                const distance = useTransform(x, (val) => {
                  const center = -val + itemWidth; 
                  return Math.abs(center - offset);
                });

                const scale = useTransform(distance, [0, itemWidth], [1, 0.85]);
                const opacity = useTransform(distance, [0, itemWidth], [1, 0.65]);

                return (
                  <motion.div
                    key={item.name + idx}
                    className="max-h-max flex-shrink-0 px-4"
                    style={{
                      width: `${itemWidth}px`,
                      scale,
                      opacity,
                    }}
                  >
                    <div className=" bg-white/10 rounded-xl text-white flex flex-col justify-center h-full p-4">
                      <div className="w-full h-full flex flex-col justify-between space-y-8">
                        <p className="text-base/5 mt-2 text-fontPrimaryColor italic">"{item.message}"</p>
                        <div className="flex items-center justify-center gap-x-2">
                          <img
                            src={item.avatar}
                            alt={`user-${item.name}`}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="text-sm font-semibold text-fontPrimaryColor/70">{item.name}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

            </motion.div>
          </div>
          <p className="z-10 text-lg font-bold italic">
            Bring Your Imagination to Life with DyahAI Realistic Image
            Generator.
          </p>

          <Button
            variant="primary"
            size="md"
            onClick={handleNavigationGenerate}
            isMotion
          >
            Try Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default About;
