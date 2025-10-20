import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

import { Container } from "../Container";
import HeadSection from "../HeadSection";

const avatar1 =
  "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/about/image-gallery-1.webp";
const avatar2 =
  "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/about/image-gallery-2.webp";
const avatar3 =
  "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/about/image-gallery-3.webp";
const ReviewCarousel = ({ items }) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [position, setPosition] = useState(1);

  const duplicatedItems = [...items, ...items];
  const halfLength = duplicatedItems.length / 2;

  useEffect(() => {
    if (containerRef.current) {
      const width =
        window.innerWidth >= 1024
          ? containerRef.current.offsetWidth / 3
          : containerRef.current.offsetWidth / 1;
      setItemWidth(width);
    }

    const handleResize = () => {
      if (containerRef.current) {
        const width =
          window.innerWidth >= 1024
            ? containerRef.current.offsetWidth / 3
            : containerRef.current.offsetWidth / 1;
        setItemWidth(width);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div
      className="relative p-0 overflow-hidden w-full h-fit items-center"
      ref={containerRef}
    >

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 5%, black 15%, black 85%, transparent 5%)",
          maskImage:
            "linear-gradient(to right, transparent 5%, black 15%, black 85%, transparent 5%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />


      <motion.div className="flex"
        style={{
          x
        }}>
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
              <div className=" bg-secondaryColor border border-borderShade/35 rounded-xl flex flex-col justify-center h-full">
                <div className="w-full h-full flex flex-col relative">
                  <div className="absolute w-[8rem] h-fit right-0 top-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-n-1/5">
                      <path d="M9 5a2 2 0 0 1 2 2v6c0 3.13-1.65 5.193-4.757 5.97a1 1 0 1 1-.486-1.94C7.984 16.473 9 15.203 9 13v-1H6a2 2 0 0 1-1.995-1.85L4 10V7a2 2 0 0 1 2-2zm9 0a2 2 0 0 1 2 2v6c0 3.13-1.65 5.193-4.757 5.97a1 1 0 1 1-.486-1.94C16.984 16.473 18 15.203 18 13v-1h-3a2 2 0 0 1-1.995-1.85L13 10V7a2 2 0 0 1 2-2z" />
                    </svg>
                  </div>
                  <div className="relative w-full flex flex-col px-6 pt-16 pb-10">

                    <p className="quote mt-2 text-n-1 text-center">
                      "{item.message}"
                    </p>
                    <div className="flex items-center justify-center gap-x-2 mt-6">
                      <img
                        src={item.avatar}
                        alt={`user-${item.name}`}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="body-3 text-n-1/70">
                        {item.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const About = ({ showReviews = false }) => {
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

  return (
    <>
      <HeadSection headerName="About">
        <span className="h2 text-n-1">
          DyahAI Image Generator
        </span>
        <span className="header-1 text-n-3/80">
          DyahAI elevates your imagination, transforming each idea into a
          striking, creative masterpiece that exceeds your wildest dreams.
          Powered by cutting-edge AI and secured with blockchain Web 3.0,
          DyahAI opens a new frontier in visual creation—where your vision
          comes to life with just a few clicks.
        </span>
      </HeadSection>

      <Container className="text-fontPrimaryColor -scroll-mt-[250px] mb-0">
        {/* body section */}
        {showReviews && <ReviewCarousel items={itemTestimony} />}
      </Container>
    </>
  );
};

export default About;
