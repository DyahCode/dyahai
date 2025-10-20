import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../provider/authProvider";
import { usePopup } from "../provider/PopupProvider";
import PaymentSnap from "../components/ui/PaymentSnap";
const OfficialDYACoins = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/coins/DYA-coins-gold.svg"


const CreditPaymentPage = () => {
  const { TopupCredit, clientId, accountId, authClient } = useAuth();
  const { showPopup, hidePopup } = usePopup();

  const [inputCredit, setInputCredit] = useState(0);
  const [icpAmount, setIcpAmount] = useState(0);
  const [icpInE8s, setIcpInE8s] = useState(0);

  const [showInvoice, setShowInvoice] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [txStatus, setTxStatus] = useState(null);

  const presetValues = [1, 3, 5, 10, 20, 50, 100, 200, 500, 1000];


  const creditCalculate = (value) => {
    const ONE_CREDIT_IS = 0.0187;
    const numValue = Number(value);
    const icp = numValue * ONE_CREDIT_IS;

    setInputCredit(numValue);
    setIcpAmount(icp);

    const e8s = Math.round(icp * 1e8);

    setIcpInE8s(e8s);
  };

  const payment = async () => {
    if (!inputCredit || inputCredit === 0) {
      showPopup({
        title: "Cannot Top Up",
        message: "You cannot top up because your credit is 0. Please add some credit first.",
        type: "warning",
        leftLabel: "OK",
        onLeft: async () => {
          hidePopup();
        },
      });
      return;
    }

    try {
      setShowInvoice(true)
      setPaymentStatus("processing");
      const txResult = await TopupCredit(icpInE8s, "credit", inputCredit, "");
      if (txResult.status === "success") {
        setTxStatus(txResult);
        setPaymentStatus(txResult.status);
        setInputCredit(0);
        setIcpAmount(0);
      } else if (txResult.status === "timeout") {
        setPaymentStatus("timeout");
      } else if (txResult.status === "reject") {
        setPaymentStatus("reject");
      } else {
        setPaymentStatus(txResult.status || "failed");
      }
    } catch (err) {
      setPaymentStatus("error");
    }
  };

  return (
    <>
      <main className="bg-primaryColor w-dvh min-h-screen flex flex-col ">
        <Navbar navbarStyle="secondary" />

        <section className="pt-[8dvh] w-full h-full flex flex-col items-center justify-start md:justify-center md:pt-[8dvh] overflow-y-auto">
          <div className="container">
            <div className="flex flex-col rounded-2xl items-center justify-center transition duration-200 border border-t-2 border-t-neutral-500/25 border-neutral-500/10 hover:border-neutral-500/25 bg-gradient-to-b from-white/[0.025] via-white/[0.015] to-white/[0.01] backdrop-blur-2xl p-2 md:p-10 group my-12">
              <div className="w-full md:w-1/2 h-full flex flex-col text-fontPrimaryColor items-center">
                <span className="text-xl">Swap with {authClient.provider === "Plug" ? "Plug Wallet" : "Internet Identity"}</span>
                <span>Pay as you want with anything</span>
                <div className="rounded-2xl p-4 md:p-8 mt-4 w-full border lg:flex lg:flex-col lg:justify-center bg-white">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total DYA Want
                    </label>
                    <div className="mt-1 flex gap-x-4 items-center">
                      <img className="size-10" src={OfficialDYACoins} alt="" />
                      <div className="flex flex-1 flex-col space-y-2">
                        <input
                          type="text"
                          value={inputCredit}
                          onChange={(e) =>
                            creditCalculate(e.target.value.replace(/\D/g, ""))
                          }
                          placeholder="0"
                          className="w-full text-xl bg-white text-black border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-borderShade/70 focus:bg-borderShade/5 proportional-nums"
                        />
                      </div>
                    </div>
                    <div className="w-full flex mt-10">
                      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2">
                        {presetValues.map((value) => (
                          <button
                            key={value}
                            onClick={() => creditCalculate(value)}
                            className={`w-full px-2 py-1 flex items-center gap-x-2 rounded-md border ${inputCredit === String(value)
                              ? "bg-blue-100 text-accentColor border-blue-600"
                              : "bg-white text-gray-700 border-gray-300"
                              } hover:bg-blue-100`}
                          >
                            <img className="size-4" src={OfficialDYACoins} alt="" />
                            <span className="text-md font-medium">{value}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-8 mt-4 w-full border lg:flex lg:flex-col lg:justify-center bg-white">
                  <span className="text-black text-center text-lg font-medium pb-2">
                    Swap Information
                  </span>
                  <div className="flex items-center gap-x-2 tracking-tight text-black bg-borderShade/10 border border-borderShade/10 rounded-lg px-4 py-2">
                    <span className="text-1xl font-medium">
                      {Number(icpAmount)
                        .toFixed(6)
                        .replace(/\.?0+$/, "")}
                    </span>
                    <p className="text-1xl font-medium">
                      ICP
                    </p>
                  </div>
                  <div className="flex items-center justify-center py-2 w-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-none stroke-accentColor stroke-[2px]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 10h14l-4-4m0 8H3l4 4" />
                    </svg>
                  </div>
                  <div className="flex items-center gap-x-2 tracking-tight text-black bg-borderShade/10 border border-borderShade/10 rounded-lg px-4 py-2">
                    <span className="text-1xl font-medium">
                      {Number(inputCredit)}
                    </span>
                    <p className="text-1xl font-medium">
                      DYA
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2 mt-4">

                    <div className="flex w-full h-full gap-x-2">

                      <div className="flex overflow-hidden  flex-col flex-1 border rounded-lg text-black text-xs md:text-sm justify-start gap-x-1 gap-y-2 p-1">
                        <div className="w-full flex i justify-center ">
                          From:
                        </div>
                        <div
                          className="justify-center truncate bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md"

                        >
                          {clientId}
                        </div>
                        <div className="w-full flex i justify-center ">
                          To:
                        </div>
                        <div
                          className="justify-center truncate bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md"

                        >
                          {accountId}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm lg:text-pretty mt-8 text-gray-500">
                    This plan is tailored for small businesses and startups
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={payment}
                      type="submit"
                      className="justify-center flex items-center gap-x-2 rounded-full bg-accentColor px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accentColor2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 w-full"
                    >
                      <span>Swap Now</span>
                    </button>
                  </div>
                  <p className="mt-6 text-xs leading-5 text-gray-500 text-pretty">
                    This Transaction automatically deducts the amount of ICP from your
                    wallet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PaymentSnap paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus} showInvoice={showInvoice} setShowInvoice={setShowInvoice} authClient={authClient} />
    </>
  );
};

export default CreditPaymentPage;
