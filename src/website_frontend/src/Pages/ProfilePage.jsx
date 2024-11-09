import React, { useState } from "react";

import Navbar from "../Components/Fragments/Navbar";
import AccountDetails from "../Components/Fragments/Profile/AccountDetails";
import PaymentGateway from "../Components/Fragments/Profile/PaymentGateway";
import GenerateHistory from "../Components/Fragments/Profile/GenerateHistory";

import { FaRegUser } from "react-icons/fa";

const ProfilePage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Account Detail");
  const asideItems = [
    {
      name: "Account Detail",
      icon: <FaRegUser size={25} className="md:ml-2" />,
      component: <AccountDetails />,
    },
    {
      name: "Payment Detail",
      icon: <FaRegUser size={25} className="md:ml-2" />,
      component: <PaymentGateway />,
    },
    {
      name: "Generate History",
      icon: <FaRegUser size={25} className="md:ml-2" />,
      component: <GenerateHistory />,
    },
  ];

  return (
    <>
      <div className="flex h-screen w-screen flex-col">
        <Navbar navbarStyle={"secondary"} />
        <div className="fixed flex h-full w-full">
          <aside className="order-3 mt-20 border-l-2 border-slate-400 md:w-1/5">
            <div className="flex min-h-full w-full flex-col gap-4 bg-white p-3 py-10 pr-5">
              {asideItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMenu(item.name)}
                  className={`border-borderShade hover:bg-primaryColor hover:text-fontPrimaryColor flex justify-center rounded-md border border-opacity-50 p-2 md:items-center md:justify-start ${
                    selectedMenu === item.name
                      ? "bg-primaryColor text-fontPrimaryColor"
                      : ""
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="hidden items-center space-x-1 rounded-md px-2 py-2 md:block">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </aside>
          <main className="bg-primaryColor order-2 w-full pt-20 md:w-4/5">
            {asideItems.find((item) => item.name === selectedMenu)?.component}
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
