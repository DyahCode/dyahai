import { motion } from "framer-motion";


// const BeforeFreeToUse = "https://bafybeig7whlap6a7w5277tmlatfyaazkjejd5gsi2bdupjf7t5ynks56ly.ipfs.w3s.link/before.png" //error
const BeforeFreeToUse = "https://bafkreicsu4crctuj72y3jcwrjm6uts2kd5jnnkxwpk4p5wkgn6yxx6hiwe.ipfs.w3s.link/?filename=before.png"
const AfterFreeToUse = "https://bafybeieqxbgazloh6wpptgdt7uzdwdkuf4fsfeo3eb5wz4tyq22wfifimq.ipfs.w3s.link/after.png"

const animationVariantOne = {
  hidden: { scale: 1, opacity: 0, y: 0 },
  visible: {
    scale: [1, 1.05, 1, 1.05],
    opacity: [0, 0, 1, 1],
    y: [0, -10, 0, -10],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const animationVariantTwo = {
  hidden: { scale: 1, opacity: 0, y: 0 },
  visible: {
    scale: [1, 1.05, 1, 1.05],
    opacity: [1, 1, 0, 0],
    y: [0, -10, 0, -10],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
};

const FTUImages = () => (
  <div className="bg-secondaryColor relative flex flex-col items-center justify-center rounded-lg">
    <div className="absolute inset-0 z-30 size-full h-full">
      <motion.img
        src={BeforeFreeToUse}
        initial="hidden"
        animate="visible"
        variants={animationVariantTwo}
        className="rounded-lg object-fill"
      />
    </div>
    <div className="relative inset-0 z-40 size-full h-full">
      <motion.img
        src={AfterFreeToUse}
        initial="hidden"
        animate="visible"
        variants={animationVariantOne}
        className="rounded-lg object-fill"
      />
    </div>
  </div>
);

export default FTUImages;
