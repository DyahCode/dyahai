import React from 'react'
import { motion } from "framer-motion";
import GlowSection from '../ui/GlowHeadSection';

const HeadSection = ({ children }) => {
  return (
    <section className="relative w-screen h-full scroll-mt-40">
      <GlowSection />

      <div className="relative z-10 flex flex-col items-center justify-center pt-[40vh] pb-[25vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0, transition: { type: "spring", bounce: 0.8 } }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center flex flex-col space-y-10 relative"
        >
          {children}
        </motion.div>
      </div>

    </section>
  )
}

export default HeadSection;