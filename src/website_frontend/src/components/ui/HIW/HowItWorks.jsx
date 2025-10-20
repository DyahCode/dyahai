import React from "react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const scrollRef = React.useRef(null);

  const [stepWidth, setStepWidth] = React.useState(getStepWidth());

  function getStepWidth() {
    if (window.innerWidth >= 1024) return 22 * 16;
    if (window.innerWidth >= 768) return 20 * 16;
    return 18 * 16;
  }

  React.useEffect(() => {
    const handleResize = () => setStepWidth(getStepWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollByStep = (direction) => {
    if (!scrollRef.current) return;

    let stepsPerScroll = 1;
    if (window.innerWidth >= 1024) stepsPerScroll = 3;
    else if (window.innerWidth >= 768) stepsPerScroll = 2;
    else stepsPerScroll = 1;

    const scrollAmount = stepWidth * stepsPerScroll * direction;

    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollToStart = () => scrollByStep(-1);
  const scrollToEnd = () => scrollByStep(1);

  return (
    <>
      <div
        ref={scrollRef}
        className="w-full px-16 flex flex-row overflow-x-hidden "
      >
        {steps.map((step, index) => {
          const dotVariants = {
            hidden: { scale: 0, opacity: 0 },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 2.0 + index * 3.0,
              },
            },
          };

          const lineVariants = {
            hidden: { width: "0%" },
            visible: {
              width: "100%",
              transition: {
                duration: 2.0,
                ease: "easeOut",
                delay: 2.5 + index * 3.0,
              },
            },
          };

          return (
            <div
              key={index}
              style={{ minWidth: `${stepWidth}px`, width: `${stepWidth}px` }}
              className="h-fit my-10 space-y-8 justify-start shrink-0"
            >
              {/* head image */}
              <div className="w-[90%] h-[12rem] flex items-end my-4 rounded-xl overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-full flex items-center relative pt-6">
                {/* dot */}
                <div className="absolute z-10 w-4 h-4 bg-n-5 rounded-full left-0 flex items-center justify-center">
                  <motion.div
                    className="w-full h-full bg-n-3 rounded-full"
                    variants={dotVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </div>

                {/* connecting line */}
                {index !== steps.length - 1 && (
                  <div className="absolute z-0 w-[99%] h-0.5 bg-n-5 right-0 overflow-hidden rounded-full">
                    <motion.div
                      className="h-full bg-n-3 origin-left"
                      variants={lineVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                )}
              </div>

              {/* info text */}
              <div className="w-[90%] flex flex-col">
                <span className="h5 text-n-1/90 mb-2">{step.title}</span>
                <p className="body-2 text-n-1/60 text-balance">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* navigation buttons */}
      <div className="w-full flex justify-end space-x-6 px-16 pb-20">
        {/* scroll left */}
        <div
          onClick={scrollToStart}
          className="cursor-pointer w-12 h-12 p-2.5 rounded-full bg-n-1/10 hover:scale-[102.5%] transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-full stroke-[1.5px] stroke-n-1 fill-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l5.625-6M4.5 12l5.625 6"
            />
          </svg>
        </div>

        {/* scroll right */}
        <div
          onClick={scrollToEnd}
          className="cursor-pointer w-12 h-12 p-2.5 rounded-full bg-n-1/10 hover:scale-[102.5%] transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-full stroke-[1.5px] stroke-n-1 fill-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-5.625-6m5.625 6l-5.625 6"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;

const steps = [
  {
    title: "Upload",
    desc: "Upload your photo to start the magic. DyahAI gets it ready in seconds.",
    img: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/howitworks/HowItWorks-1.webp",
  },
  {
    title: "Choose Style",
    desc: "Pick the vibe you like — realistic, anime, cinematic, or something totally unique.",
    img: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/howitworks/HowItWorks-2.webp",
  },
  {
    title: "AI Processing",
    desc: "Our AI takes over, crafting your image with the style you’ve chosen.",
    img: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/howitworks/HowItWorks-3.webp",
  },
  {
    title: "Generate",
    desc: "Watch your idea turn into a brand-new artwork, right before your eyes.",
    img: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/howitworks/HowItWorks-4.webp",
  },
  {
    title: "Enhance",
    desc: "Customize your look! Try different moods or explore more variations.",
    img: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/howitworks/HowItWorks-5.webp",
  },
  {
    title: "Download",
    desc: "Securely stored on IPFS — download or revisit anytime you want.",
    img: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/features/howitworks/HowItWorks-6.webp",
  },
];
