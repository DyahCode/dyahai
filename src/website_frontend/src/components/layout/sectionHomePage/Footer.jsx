import React from "react";

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
        className="footer bg-secondaryColor bottom-0 scroll-mt-20 relative w-full"
      >
        <div className="pb-8 pt-12 text-center md:px-20 border-t border-borderShade border-opacity-40">
          <div className="flex flex-wrap justify-center gap-6 py-4 md:grid-cols-3">
            <div className="flex items-center md:hidden">
              <ul className="flex divide-x divide-slate-300 divide-opacity-20 text-white/70">
                {menuItems.map((item, index) => (
                  <li key={index} className="px-2.5">
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
                      className="select-none transition transform ease-in-out duration-150 text-white/60 hover:text-fontPrimaryColor"
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
                  <li key={index} className="">
                    <a
                      href={item.href}
                      className="select-none transition transform ease-in-out duration-150 text-gray-600 hover:text-fontPrimaryColor"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pb-2 pt-5 text-xs font-light text-white/30">
            <p>Copyright © 2024 DyahAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
