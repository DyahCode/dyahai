import React, { useState } from "react";

import Navbar from "../components/layout/Navbar";
import AccountDetails from "../components/layout/sectionProfilePage/AccountDetails";
import TransactionHistory from "../components/layout/sectionProfilePage/TransactionHistory";
import GenerateHistory from "../components/layout/sectionProfilePage/GenerateHistory";
import UserWallet from "../components/layout/sectionProfilePage/UserWallet";
import Button from "../components/ui/Button";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../provider/authProvider";
import { FiArrowRightCircle } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";

const plans = [
  {
    name: "Premium",
    features: ["Full access to our models", "Includes 100 coin for generating"],
  },
  {
    name: "Ultimate",
    features: [
      "Full access to our models",
      "Includes 100 coin for generating",
      "Custom API integration",
      "Full model customization",
    ],
  },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const {
    credit,
    principalId,
    isLoggedIn,
    Login,
    Logout,
    tier,
    actor,
    actorLedger,
    authClient,
    refreshCredit,
  } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState("Account Detail");
  const asideItems = [
    {
      name: "Account Detail",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-7 stroke-[2px]"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 7.5a3 3 0 1 1-6 0a3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0" />
            <path d="M11.192 17.565c.394-.21.591-.315.808-.315s.414.105.808.315l.134.072c.394.21.591.315.7.488s.108.383.108.804v.142c0 .42 0 .63-.108.804c-.109.173-.306.278-.7.488l-.134.072c-.394.21-.591.315-.808.315s-.414-.105-.808-.315l-.134-.072c-.394-.21-.591-.315-.7-.488s-.108-.383-.108-.804v-.142c0-.42 0-.63.108-.804c.109-.173.306-.278.7-.488z" />
          </g>
        </svg>
      ),
      component: <AccountDetails principalId={principalId} />,
    },
    {
      name: "Transaction History",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-7 stroke-[2px]"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19.27 16.202A7.81 7.81 0 0 1 12.06 21c-4.313 0-7.81-3.492-7.81-7.8S5.89 7.13 8.455 3c4.806 2.1 4.806 8.4 4.806 8.4s1.579-3.038 4.807-4.5c1.034 3.042 2.43 6.365 1.202 9.302" />
            <path d="M12 18a5 5 0 0 1-5-5" />
          </g>
        </svg>
      ),
      component: <TransactionHistory />,
    },
    {
      name: "Generate History",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-7 stroke-[1.5px]"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0" />
            <path d="M7 9a2 2 0 1 0 4 0a2 2 0 0 0-4 0m13.718 1.08c-6.38-.75-11.85 3.906-11.716 10.144" />
            <path d="M3.2 13.04c2.7-.294 5.107 1.036 6.424 3.126" />
          </g>
        </svg>
      ),
      component: (
        <GenerateHistory
          principalId={principalId}
          isLoggedIn={isLoggedIn}
          actor={actor}
          actorLedger={actorLedger}
          authClient={authClient}
          refreshCredit={refreshCredit}
          credit={credit}
        />
      ),
    },
    {
      name: "Wallet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-7 stroke-[1.75px]"
        >
          <g fill="none" stroke="currentColor">
            <path d="M19 20H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z" />
            <path
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 14a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
            />
            <path d="M18 7V5.603a2 2 0 0 0-2.515-1.932l-11 2.933A2 2 0 0 0 3 8.537V9" />
          </g>
        </svg>
      ),
      component: <UserWallet />,
    },
  ];

  return (
    <>
      <main className="bg-primaryColor h-full md:h-dvh w-full flex flex-col justify-between md:flex-row md:overflow-hidden">
        <Navbar navbarStyle={"secondary"} />
        <section className="pt-[8dvh] w-full flex justify-end flex-row h-dvh">
          {/* right side */}
          <section className="bg-secondaryColor border-borderShade text-fontPrimaryColor right-0 w-fit lg:min-w-[26rem] lg:w-[26rem] border-l-2 border-opacity-50 order-last flex flex-col justify-between p-2 lg:py-8 lg:px-10">
            <div className="">
              <div className="w-full h-0 border-[0.75px] border-white/10 my-4"></div>

              <ul className="py-2 flex flex-col gap-y-2">
                {asideItems.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedMenu(item.name)}
                    className={`flex max-lg:w-full justify-center rounded-md border border-opacity-50 p-2 lg:p-2.5 lg:items-center lg:justify-start border-borderShade text-sm cursor-pointer gap-x-2 ${
                      selectedMenu === item.name
                        ? "bg-gradient-to-r from-accentColor/[0.1] from-10% to-accentColor/[0.035] to-80% text-fontPrimaryColor"
                        : "bg-primaryColor text-fontPrimaryColor/70 hover:bg-accentColor/[0.05]"
                    }`}
                  >
                    <div
                      className={`text-2xl items-center justify-center flex aspect-square ${
                        selectedMenu === item.name
                          ? "text-accentColor"
                          : "text-fontPrimaryColor/70"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span className="hidden items-center rounded-md lg:block select-none">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="">
              <span className="hidden lg:block text-sm text-fontPrimaryColor/75">
                {tier === "Ultimate" ? " " : "Wanna try?"}
              </span>
              <div className="hidden lg:block mt-4 h-auto w-full gap-x-2 ">
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
                      ? "2.02  ICP / Mo"
                      : tier === "Premium"
                        ? "5.04 ICP / Mo"
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
                    onClick={() => {
                      navigate("/pricing");
                    }}
                    className="mt-4 bg-fontPrimaryColor flex items-center justify-center gap-x-4 rounded-full px-4 py-2 text-xs font-medium text-black"
                  >
                    <span>Next step</span>
                    <FiArrowRightCircle size={16} />
                  </button>
                </div>
              </div>

              <div className="w-full h-0 border-[0.75px] border-white/10 my-4"></div>

              <div className="mt-2 flex max-lg:flex-col justify-between items-center text-sm gap-2">
                <Button
                  type="outline"
                  withIcon
                  onClick={() => {
                    navigate("/terms");
                  }}
                  className="w-full md:w-auto"
                >
                  <div className="h-6 flex items-center justify-center text-center space-x-2">
                    <span >Terms of Services</span>
                  </div>
                </Button>

                <Button type="outline" onClick={Logout} withIcon className="w-full md:flex-1">
                  <div className="h-6 flex items-center justify-center text-center space-x-2">
                    <div className="w-6 h-fit">
                      <TbLogout size={20} />
                    </div>
                    <span className="text-">Log Out</span>
                  </div>
                </Button>
              </div>
            </div>
          </section>
          <section className="bg-primaryColor order-first w-full">
            <div className="mx-auto w-full md:max-w-[39rem] lg:max-w-[39rem] xl:max-w-[55rem] 2xl:max-w-[71rem] p-4 h-full text-fontPrimaryColor">
              {asideItems.find((item) => item.name === selectedMenu)?.component}
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
