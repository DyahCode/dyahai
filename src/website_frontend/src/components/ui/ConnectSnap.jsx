import React, { useState, useEffect } from "react";
import Button from "./Button";

import identity from "../../assets/identity.ico";
const plugLogo =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icon/plug-wallet-logo.webp";

const ConnectSnap = ({ showConnectSnap, setShowConnectSnap, handleLogin }) => {
  return (
    <>
      {showConnectSnap && (
        <section className="flex w-full h-full justify-center items-center fixed inset-0 bg-black/20 z-[999] backdrop-blur-sm text-white">
          <div className="relative max-w-[40rem] min-h-[16rem] w-[90%] flex flex-col  justify-center items-center text-center rounded-xl opacity-95 hover:opacity-100 transition-opacity duration-200 bg-primaryColor overflow-hidden shadow-[0.063em_0.75em_1.563em_rgba(0,0,0,0.78)] p-10 gap-8">
            {/* Close Button */}
            <div className="flex w-full h-8 justify-end items-center">
              <button
                onClick={() => setShowConnectSnap(false)}
                className="px-4 text-2xl font-bold"
              >
                x
              </button>
            </div>
            <div>
              <h1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus obcaecati itaque quibusdam minima cum sequi saepe,
                corporis deserunt error libero ipsum quaerat labore tempora,
                tenetur fuga? Eum, est nemo. Eum aperiam sequi eos
              </h1>
            </div>
            <div className="w-full flex flex-col gap-4">
              <Button
                onClick={() => {
                  handleLogin("Internet Identity");
                  setShowConnectSnap(false);
                }}
                size="md"
                variant="primary"
                className=" rounded-md"
              >
                <img className="w-6 h-6" src={identity} alt="" />
                Internet Identity
              </Button>
              <Button
                onClick={() => {
                  handleLogin("Plug");
                  setShowConnectSnap(false);
                }}
                size="md"
                variant="primary"
                className="rounded-md"
              >
                <img className="w-6 h-6" src={plugLogo} alt="" />
                Plug Wallet
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ConnectSnap;
