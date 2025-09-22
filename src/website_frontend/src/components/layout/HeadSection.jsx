import React from 'react'
import { motion } from "framer-motion";
import GlowSection from '../ui/GlowHeadSection';

const HeadSection = ({ children, backgroundMotion = false, distance = "long" }) => {
  return (
    <section className="relative w-screen h-full scroll-mt-40">

      {backgroundMotion && <GlowSection />}

      <div className={`relative z-10 flex flex-col items-center justify-center text-center pt-[40vh] text-fontPrimaryColor ${distance === "long" ? "pb-[25vh]" : "pb-[5vh] md:pb-[10vh]"}`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.8 } }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center flex flex-col space-y-10 relative w-full"
        >
          {children}
        </motion.div>
      </div>

    </section >
  )
}

export default HeadSection;