import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const menuItems = [
    { name: "HOME", href: "#" },
    { name: "FEATURE", href: "#feature" },
    { name: "GALLERY", href: "#gallery" },
    { name: "ABOUT", href: "#about" },
  ];
  return (
    <>
      <footer
        id="footer"
        className="footer bg-primaryColor bottom-0 scroll-mt-20"
      >
        <div className="bottom-0 h-0 overflow-hidden">
          <motion.div
            className="-z-5 absolute h-1/2 w-full -translate-y-[100%]"
            style={{
              background:
                "linear-gradient(to top, #08baa5 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          />
        </div>
        <div className="pb-5 pt-12 text-center md:px-20">
          <div className="flex flex-wrap justify-center gap-6 py-4 text-white md:grid-cols-3">
            <div className="flex items-center md:hidden">
              <ul className="flex divide-x-2 divide-slate-300 divide-opacity-20">
                {menuItems.map((item, index) => (
                  <li key={index} className="px-2">
                    <a href={item.href}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden w-auto items-center justify-center md:flex">
              <ul className="flex gap-10">
                {menuItems.slice(0, 2).map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="hover:text-fontPrimaryColor hover:border-fontPrimaryColor border-b-2 border-transparent text-gray-600 focus:border-transparent"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-last w-full md:order-none md:w-auto md:justify-center md:px-4">
              <h1 className="w-auto text-3xl font-bold text-white">
                <a href="#Home">DyahAI.</a>
              </h1>
            </div>
            <div className="hidden w-auto items-center justify-center md:flex">
              <ul className="flex gap-10">
                {menuItems.slice(2, 4).map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="hover:text-fontPrimaryColor hover:border-fontPrimaryColor border-b-2 border-transparent text-gray-600 focus:border-transparent"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pb-2 pt-5 text-xs font-light text-white">
            <p>Copyright © 2024 DyahAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
