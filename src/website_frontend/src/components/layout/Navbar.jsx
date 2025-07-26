import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { useDropdown } from "../../hooks/useDropdown";
import { useToggleMenu } from "../../hooks/useTogglemenu";

import HumbergerButton from "../ui/HumbergerButton/HumbergerButton";
import Button from "../ui/Button";

import { LuWallet } from "react-icons/lu";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";

import HeroProfile from "../../assets/images/about/image-gallery-1.jpg"

const Navbar = ({
  navbarStyle,
  principalId,
  loading,
  isLoggedIn,
  credit,
  Login,
  Logout,
  tier,
}) => {
  const navigate = useNavigate();
  const { isOpen, toggleMenu } = useToggleMenu();
  const { dropdownRef } = useDropdown();
  // Dropdown untuk Credit
  const {
    isDropdownOpen: isCreditOpen,
    toggleDropdown: toggleCredit,
    dropdownRef: creditRef,
  } = useDropdown();

  // Dropdown untuk User/Profile
  const {
    isDropdownOpen: isUserOpen,
    toggleDropdown: toggleUser,
    dropdownRef: userRef,
  } = useDropdown();

  const menuItems = [
    { name: "HOME", href: "#" },
    { name: "PRICING", href: "/pricing" },
    { name: "TERMS", href: "/terms" },
    { name: "ABOUT", href: "#about" },
  ];

  const menuContainerVariants = {
    hidden: { x: -200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "Spring", bounce: 0.8 } },
  };

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(scrollY.get() > 150);
    };
    const unsubscribe = scrollY.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const getNavbarBackground = () => {
    if (navbarStyle === "primary") {
      return isScrolled ? "rgba(22, 27, 36, 1)" : "rgba(22, 27, 36, 0)";
    }
    // secondary atau yang lainnya
    return "rgba(22, 27, 36, 1)";
  };

  const navbarBackground = getNavbarBackground();

  return (
    <motion.nav
      ref={dropdownRef}
      style={{ backgroundColor: navbarBackground }}
      animate={{ backgroundColor: navbarBackground }}
      transition={{ duration: 0.2, ease: "easeIn" }}
      className="navbar fixed top-0 start-0 h-[8dvh] w-full z-[999] transition-all"
    >
      <div className="flex h-full w-full justify-center px-5 md:px-10">
        <div className="navbar-box flex w-full items-center justify-between">
          <div className="logo text-fontPrimaryColor hover:border-borderShade select-none rounded-lg border-transparent px-3 py-2 hover:border-opacity-40">
            {navbarStyle === "primary" ? (
              <div>
                <a href="/" className="hidden text-2xl font-bold md:block">
                  DyahAI.
                </a>
                <div onClick={toggleMenu}>
                  <HumbergerButton />
                </div>
              </div>
            ) : (
              <a href="/" className="text-2xl font-bold">
                DyahAI.
              </a>
            )}
          </div>
          <ul className="w-[40vh] lg:w-[50vh] text-md bg-secondaryColor border-borderShade text-fontPrimaryColor hidden rounded-lg border border-opacity-50 px-8 py-2 justify-between font-semibold tracking-tight md:flex">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="hover:text-accentColor">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            {!loading && isLoggedIn ? (
              <div className="text-fontPrimaryColor relative">
                <div className="flex items-center justify-center gap-3">
                  {/* Button Credit */}
                  {/* Button Credit */}
                  <div className="relative space-y-3" ref={creditRef}>
                    <Button
                      onClick={toggleCredit}
                      variant="outline"
                      size="icon"
                      className="hover:bg-accentColor hover:border-accentColor"
                      isMotion
                    >
                      <LuWallet size={24} />
                      <span>{credit}</span>
                    </Button>
                    {isCreditOpen && (
                      <div className="absolute right-0">
                        <div className="bg-secondaryColor border-borderShade border-opacity-40 text-fontPrimaryColor w-full h-full rounded-lg border z-20 px-4 py-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => navigate("/topup")}
                            className="w-max px-2 py-[6px] text-sm hover:bg-accentColor/[0.125]"
                          >
                            <p className="text-sm">Top up Now</p>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Button Credit */}
                  {/* Button Credit */}

                  {/* Button Profile Menu */}
                  {/* Button Profile Menu */}
                  <div className="relative space-y-3" ref={userRef}>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={toggleUser}
                      className="hover:bg-accentColor hover:border-accentColor"
                      isMotion
                    >
                      <FaRegUserCircle size={24} />
                    </Button>
                    {isUserOpen && (
                      <div className="absolute right-0">
                        <div className="bg-secondaryColor border-borderShade border-opacity-40 text-fontPrimaryColor w-[25rem] h-full rounded-lg border z-20 px-4 py-2">
                          {/* section atas */}
                          <div className="border-borderShade flex flex-col rounded-md border border-opacity-20 md:flex-row p-2 bg-transparent hover:bg-accentColor/[0.025] duration-200 transition group relative overflow-hidden">

                            <div className="absolute top-0 right-0 bg-white/[0.075] p-1 px-2 rounded-es-lg">
                              <span className={`text-sm font-semibold ${tier === "Ultimate" ? "text-yellow-600" : tier === "Pro" ? "text-lime-500" : "text-fontPrimaryColor/70"}`}>
                                {tier}
                              </span>
                            </div>
                            <div className="w-full flex flex-col items-center justify-start space-y-2">
                              {/* profile */}
                              <div class="flex justify-center items-center">
                                <svg viewBox="0 0 24 24" class="w-12 h-12 md:w-20 md:h-20">
                                  {/* <!-- Border luar heksagon --> */}
                                  <path className="fill-none stroke-white stroke-[1.5px]"
                                    d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75"
                                  />
                                  {/* <!-- Clip path untuk gambar --> */}
                                  <defs>
                                    <clipPath id="hexClip">
                                      <path
                                        d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75"
                                      />
                                    </clipPath>
                                  </defs>
                                  {/* <!-- Gambar profil di dalam hexagon --> */}
                                  <image
                                    className="size-full object-cover"
                                    href={HeroProfile}
                                    clip-path="url(#hexClip)"
                                    preserveAspectRatio="xMidYMid slice"
                                  />
                                </svg>
                              </div>
                              {/* profile */}

                              <div className="bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md overflow-hidden break-all">
                                <p className="text-base/4 font-medium font-mono text-accentColor w-full lining-nums line-clamp-1">{principalId}</p>
                              </div>
                            </div>
                          </div>

                          <div className="w-full h-0 border-[0.75px] border-white/10 my-4"></div>

                          <ul className="py-2 flex flex-col gap-y-2">
                            <li
                              onClick={() => navigate("/profile")}
                              className="flex justify-center rounded-md border border-opacity-50 p-2 md:items-center md:justify-start border-borderShade text-sm cursor-pointer gap-x-2 bg-primaryColor text-fontPrimaryColor/70 hover:bg-accentColor/[0.05]"
                            >
                              <div
                                className={`text-2xl items-center justify-center flex aspect-square p-1 text-fontPrimaryColor/70
                                  `}
                              >
                                <FaRegUser size={22} className="" />
                              </div>
                              <span className="hidden items-center rounded-md md:block select-none">
                                Your Profile
                              </span>
                            </li>
                          </ul>

                          {/* section bawah */}
                          <div className="">
                            <span className="text-sm text-fontPrimaryColor/75">
                              Wanna try?
                            </span>
                            <div className=" mt-4 h-auto w-full gap-x-2 ">
                              <div className="bg-accentColor text-fontPrimaryColor relative mb-4 flex w-full flex-col justify-between rounded-xl px-4 py-5 text-sm overflow-hidden">
                                <span className="text-fontPrimaryColor text-sm font-semibold uppercase">
                                  {tier === "Basic"
                                    ? "Premium"
                                    : tier === "Premium"
                                      ? "Ultimate"
                                      : "-"}
                                </span>
                                <span className="text-primaryColor font-semibold absolute right-0 top-0 py-1 px-4 text-sm bg-red-400 rounded-es-xl">
                                  {tier === "Basic"
                                    ? "2.02  ICP / Mo"
                                    : tier === "Premium"
                                      ? "5.04 ICP / Mo"
                                      : "Free"}
                                </span>
                                <div className="mt-2 text-sm flex flex-col items-start">
                                  <ol className="ml-1 list-disc list-inside text-sm font-medium">
                                    <li>Full access to basic and advanced AI models</li>
                                    <li>100+ requests per day</li>
                                  </ol>
                                </div>
                                <button className="mt-4 bg-fontPrimaryColor flex items-center justify-center gap-x-4 rounded-full px-4 py-2 text-xs font-medium text-black " onClick={() => {
                                  navigate("/pricing");
                                }}>
                                  <span>Next step</span>
                                  <FiArrowRightCircle size={16} />
                                </button>
                              </div>
                            </div>

                            <div className="w-full h-0 border-[0.75px] border-white/10 my-4"></div>

                            <div className="mt-2 flex justify-between items-center text-sm">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                  navigate("/terms");
                                }}
                                className="px-2 py-[6px] text-sm hover:bg-accentColor/[0.125]"
                              >
                                <p className="text-sm">Terms of Services</p>
                              </Button>

                              <Button
                                variant="outline"
                                size="icon"
                                onClick={Logout}
                                className="px-2 py-[6px] flex items-center text-sm hover:bg-red-500"
                              >
                                <p className="text-sm">Log Out</p>
                                <TbLogout size={20} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Button Profile Menu */}
                  {/* Button Profile Menu */}
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="icon"
                onClick={Login}
                className="hover:bg-accentColor hover:border-accentColor hover:shadow-[0px_5px_30px_5px_rgba(32,_119,_116,_.75)]"
                isMotion
              >
                Connect PlugWallet
              </Button>
            )}
          </div>
        </div>
      </div>
      <motion.div
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={menuContainerVariants}
        className={`border-borderShade absolute w-full overflow-hidden ${isOpen ? "block" : "hidden"} md:hidden`}
      // className={`border-borderShade absolute w-full overflow-hidden rounded-lg border border-opacity-40 ${isOpen ? "block" : "hidden"} md:hidden`}
      >
        <ul className="bg-secondaryColor text-fontPrimaryColor flex w-full flex-col items-center justify-center gap-y-5 p-4 text-lg font-semibold">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={toggleMenu}
                className="text-fontPrimaryColor hover:text-accentColor"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
