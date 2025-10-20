import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { useDropdown } from "../../utils/useDropdown";
import { useToggleMenu } from "../../utils/useTogglemenu";

import HumbergerButton from "../ui/HumbergerButton/HumbergerButton";
import Button from "../ui/Button";

import { LuWallet } from "react-icons/lu";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { FiArrowRightCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "../../provider/authProvider";
import { usePopup } from "../../provider/PopupProvider";

const HeroProfile =
  "https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/about/image-gallery-1.webp";

const Navbar = ({ navbarStyle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, credit, principalId, isLoggedIn, Login, Logout, tier } =
    useAuth();
  const { showPopup, hidePopup } = usePopup();
  const { isOpen, toggleMenu } = useToggleMenu();
  const { dropdownRef } = useDropdown();
  const mobileMenuRef = React.useRef(null);

  const {
    isDropdownOpen: isCreditOpen,
    toggleDropdown: toggleCredit,
    dropdownRef: creditRef,
  } = useDropdown();

  const {
    isDropdownOpen: isUserOpen,
    toggleDropdown: toggleUser,
    dropdownRef: userRef,
  } = useDropdown();

  const {
    isDropdownOpen: isConnectOpen,
    dropdownRef: ConnectRef,
  } = useDropdown();

  const plans = [
    {
      name: "Premium",
      features: ["Full access to our models", "Includes 25 DYA Token"],
    },
    {
      name: "Ultimate",
      features: [
        "Full access to our models",
        "Includes 50 DYA Token",
        "Custom API integration",
        "Full model customization",
      ],
    },
  ];

  const menuItems = [
    { name: "Home", href: "/" },
    {
      name: "Services", submenu: [
        // { name: "AI Models", details: "Learn Our Models Works", href: "/" },
        { name: "Generate Images", details: "Learn Our Models Works", href: "/generate" },
        { name: "Buy Tokens", details: "Buy DYA Token for Generate Images", href: "/topup" },
        { name: "Pricing Plan", details: "Upgrade Your Plan With Advanced Features", href: "/pricing" },
        { name: "Mint NFT", details: "Publish Your Generate Images With NFT Minting", href: "/nft-collection" },
      ]
    },
    {
      name: "Company",
      submenu: [
        {
          name: "About",
          details: "Redefining AI Image Generative Seamless",
          href: "/about",
        },
        { name: "White Paper", details: "Understand Our Concept", href: "/" },
        {
          name: "Terms of Services",
          details: "Using our service means you agree to these terms.",
          href: "/terms",
        },
      ],
    },
    { name: "Ledger", href: "/block-explorer" },
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
      return isScrolled ? "rgba(13, 20, 24, 1)" : "rgba(13, 20, 24, 0)";
    }
    return "rgba(16, 23, 26, 1)";
  };

  const handleNavigation = (href) => {
    if (href === "/#") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }
    if (href.startsWith("/#")) {
      const sectionId = href.substring(2);

      if (location.pathname !== "/") {
        navigate("/#" + sectionId);
        return;
      }
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/#" + sectionId);
      }
    } else {
      navigate(href);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        if (isOpen) toggleMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleMenu]);

  const handleConnect = (onConnectType) => {
    switch (onConnectType) {
      case "Plug":
        if (!window.ic?.plug) {
          showPopup({
            title: "Plug Wallet Not Detected",
            message:
              "To continue, you need to install Plug Wallet. Please download and install it from the Chrome Web Store, then refresh this page to connect your wallet.",
            type: "default",
            extend: "plugInstruction",
            leftLabel: "Login",
            onLeft: () => {
              Login(onConnectType);
            },
          });
          return;
        }
        console.log("onConnectType :>> ", onConnectType);
        Login(onConnectType);
        break;
      case "Internet Identity":
        console.log(">> Connecting via Internet Identity...");
        console.log("onConnectType :>> ", onConnectType);
        Login(onConnectType);
        break;
      default:
        console.warn("Unknown connect type");
    }
  };

  const toggleConnect = () => {
    showPopup({
      ConnectButtonPopup: true,
      props: { onConnect: handleConnect },
    });
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
        <div className="flex w-full items-center justify-between">
          <div className="text-fontPrimaryColor hover:border-borderShade select-none rounded-lg border-transparent px-3 py-2 hover:border-opacity-40">
            {navbarStyle === "primary" ? (
              <div>
                <a
                  onClick={() => navigate("/")}
                  className="hidden text-2xl font-bold md:block cursor-pointer"
                >
                  DyahAI.
                </a>
                <HumbergerButton isOpen={isOpen} toggleMenu={toggleMenu} />
              </div>
            ) : (
              <a
                onClick={() => navigate("/")}
                className="text-2xl font-bold cursor-pointer"
              >
                DyahAI.
              </a>
            )}
          </div>
          <div className="w-fit h-fit bg-secondaryColor border-borderShade hidden rounded-lg border border-opacity-50 gap-x-8 px-8 md:flex relative">
            {menuItems.map((item, index) => (
              <div key={index} className="group py-2.5">
                <div
                  onClick={() => item.href && handleNavigation(item.href)}
                  className="flex items-center space-x-1 cursor-pointer"
                >
                  <span className="navigation text-fontPrimaryColor group-hover:text-accentColor duration-300 transition-all">
                    {item.name}
                  </span>

                  {item.submenu && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 stroke-[2px] stroke-fontPrimaryColor/70 group-hover:stroke-accentColor group-hover:rotate-180 duration-300 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  )}
                </div>

                {item.submenu && (
                  <div className="absolute left-0 top-full invisible group-hover:visible z-30 w-full pt-6 duration-300 transition-all">
                    <div className="invisible group-hover:visible duration-150 bg-secondaryColor border border-borderShade border-opacity-40 text-fontPrimaryColor rounded-lg shadow-lg p-2.5 grid grid-cols-2 gap-x-2.5 gap-y-5">
                      {item.submenu.map((sub, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleNavigation(sub.href)}
                          className="py-1 px-2 cursor-pointer hover:bg-accentColor/[0.1] rounded-md transition-all"
                        >
                          <span className="navigation font-light">
                            {sub.name}
                          </span>
                          <p className="sub-navigation text-fontPrimaryColor/70">
                            {sub.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {!loading && isLoggedIn ? (
              <div className="text-fontPrimaryColor relative">
                <div className="flex items-center justify-center gap-3">
                  <div className="relative space-y-3" ref={creditRef}>
                    <Button type="outline" onClick={toggleCredit}>
                      <LuWallet size={24} />
                      <span>{credit}</span>
                      <span>DYA</span>
                    </Button>
                    {isCreditOpen && (
                      <div className="absolute right-0">
                        <div className="bg-secondaryColor border-borderShade border-opacity-40 text-fontPrimaryColor w-full h-full rounded-lg border z-20 px-4 py-2">
                          <Button
                            type="outline"
                            onClick={() => navigate("/profile/wallet")}
                            className="w-max px-2 py-[6px] text-sm hover:bg-accentColor/[0.125]"
                          >
                            <p className="text-sm">Go to wallet</p>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative space-y-3" ref={userRef}>
                    <Button
                      type="outline"
                      withIcon
                      onClick={toggleUser}
                      className="hover:bg-accentColor hover:border-accentColor"
                      isMotion
                    >
                      <FaRegUserCircle size={24} />
                    </Button>
                    {isUserOpen && (
                      <div className="absolute right-0">
                        <div className="bg-secondaryColor border-borderShade border-opacity-40 text-fontPrimaryColor w-[25rem] h-full rounded-lg border z-20 px-4 py-2">
                          <div className="border-borderShade flex flex-col rounded-md border border-opacity-20 md:flex-row p-2 bg-transparent hover:bg-accentColor/[0.025] duration-200 transition group relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-white/[0.075] p-1 px-2 rounded-es-lg">
                              <span
                                className={`text-sm font-semibold ${tier === "Ultimate" ? "text-yellow-600" : tier === "Pro" ? "text-lime-500" : "text-fontPrimaryColor/70"}`}
                              >
                                {tier}
                              </span>
                            </div>
                            <div className="w-full flex flex-col items-center justify-start space-y-2">
                              {/* profile */}
                              <div className="flex justify-center items-center">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="w-12 h-12 md:w-20 md:h-20"
                                >
                                  <path
                                    className="fill-none stroke-white stroke-[1.5px]"
                                    d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75"
                                  />
                                  <defs>
                                    <clipPath id="hexClip">
                                      <path d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75" />
                                    </clipPath>
                                  </defs>
                                  <image
                                    className="size-full object-cover"
                                    href={HeroProfile}
                                    clipPath="url(#hexClip)"
                                    preserveAspectRatio="xMidYMid slice"
                                  />
                                </svg>
                              </div>
                              {/* profile */}

                              <div className="bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md overflow-hidden break-all">
                                <p className="text-base/4 font-medium font-mono text-accentColor w-full lining-nums line-clamp-1">
                                  {principalId}
                                </p>
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

                          <div className="">
                            <span className="text-sm text-fontPrimaryColor/75">
                              {tier === "Ultimate" ? " " : "Wanna try?"}
                            </span>
                            <div className=" mt-4 h-auto w-full gap-x-2 ">
                              <div className="bg-accentColor text-fontPrimaryColor relative mb-4 flex w-full flex-col justify-between rounded-xl px-4 py-5 text-sm overflow-hidden">
                                <span className="text-fontPrimaryColor text-sm font-semibold uppercase">
                                  {tier === "Basic"
                                    ? "Premium"
                                    : tier === "Premium"
                                      ? "Ultimate"
                                      : "Full Access"}
                                </span>
                                <span className="text-primaryColor font-semibold absolute right-0 top-0 py-1 px-4 text-sm bg-red-400 rounded-es-xl">
                                  {tier === "Basic"
                                    ? "$12.1  USD / Mo"
                                    : tier === "Premium"
                                      ? "$18.14  USD / Mo"
                                      : "Free"}
                                </span>
                                <div className="mt-2 text-sm flex flex-col items-start">
                                  <ol className="ml-1 list-disc list-inside text-sm font-medium">
                                    {(tier === "Basic"
                                      ? plans[0].features
                                      : tier === "Premium"
                                        ? plans[1].features
                                        : ["You fully access our features"]
                                    ).map((feature, idx) => (
                                      <li key={idx}>{feature}</li>
                                    ))}
                                  </ol>
                                </div>
                                <button
                                  className="mt-4 bg-fontPrimaryColor flex items-center justify-center gap-x-4 rounded-full px-4 py-2 text-xs font-medium text-black "
                                  onClick={() => {
                                    navigate("/pricing");
                                  }}
                                >
                                  <span onClick={() => navigate("/pricing")}>Next step</span>
                                  <FiArrowRightCircle size={16} />
                                </button>
                              </div>
                            </div>

                            <div className="w-full h-0 border-[0.75px] border-white/10 my-4"></div>

                            <div className="mt-2 flex justify-between items-center text-sm">
                              <Button
                                type="outline"
                                onClick={() => {
                                  navigate("/terms");
                                }}
                              >
                                <p className="text-sm">Terms of Services</p>
                              </Button>

                              <Button
                                type="outline"
                                onClick={Logout}
                                centering
                              >
                                <div className="flex items-center justify-center text-center space-x-2">
                                  <div className="w-6">
                                    <TbLogout size={20} />
                                  </div>
                                  <span>Log Out</span>
                                </div>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative space-y-3" ref={ConnectRef}>
                <Button type="outline" onClick={toggleConnect}>
                  Connect
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* mobile dropdown menu */}
      <motion.div
        ref={mobileMenuRef}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={menuContainerVariants}
        className="border border-borderShade absolute w-full h-fit overflow-hidden md:hidden z-5 bg-secondaryColor items-start justify-start px-6 py-4 pb-10"
      >
        <div className="w-full flex items-center space-x-1 mb-4">
          <img
            src="https://cdn.jsdelivr.net/gh/DyahCode/dyahai-assets@main/logo/DyahAI-logo.svg"
            alt=""
            className="w-6 h-6"
          />
          <span className="mt-1.5 text-lg font-bold">DyahAI</span>
        </div>
        <ul className="text-fontPrimaryColor flex w-full flex-col space-y-4 text-base font-semibold">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="w-full border-b border-borderShade body-1 font-normal space-y-4"
            >
              {item.submenu ? (
                <details className="w-full group pb-2">
                  <summary className="flex justify-between items-center cursor-pointer text-fontPrimaryColor group-open:text-accentColor transition-all duration-300">
                    <span>{item.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 stroke-fontPrimaryColor/70 group-open:rotate-180 group-open:stroke-accentColor transition-transform duration-300 fill-none stroke-[2px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </summary>
                  <ul className="pl-4 mt-4 space-y-2">
                    {item.submenu.map((sub, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          handleNavigation(sub.href);
                          toggleMenu();
                        }}
                        className="py-2 cursor-pointer text-fontPrimaryColor/80 hover:text-accentColor transition-all"
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <a
                  onClick={() => {
                    handleNavigation(item.href);
                    toggleMenu();
                  }}
                  className="block py-2 text-fontPrimaryColor hover:text-accentColor transition-all"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;