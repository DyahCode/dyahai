import React from "react";
import Navbar from "../components/layout/Navbar";
import { useAuth } from "../provider/authProvider";
import { usePopup } from "../provider/PopupProvider";

const CreditPaymentPage = () => {
  const { TopupCredit, clientId, accountId, } = useAuth();
  const { showPopup, hidePopup } = usePopup();

  const [inputCredit, setInputCredit] = React.useState(0);
  const [icpAmount, setIcpAmount] = React.useState(0);
  const [icpInE8s, setIcpInE8s] = React.useState(0);

  const [showInvoice, setShowInvoice] = React.useState(false);
  const [paymentStatus, setPaymentStatus] = React.useState("idle");
  const [txStatus, setTxStatus] = React.useState(null);




  const ICP_PRICE_USD = 6.2;
  const GENERATE_PRICE = 0.1;
  const NEW_GENERATE_PRICE = GENERATE_PRICE / ICP_PRICE_USD;

  const ICP_PRICE_XDR = 4.2;
  const ICP_CYCLE = ICP_PRICE_XDR * 1_000_000_000_000;
  const REQUEST_IN_CYCLE = 10_800_000_000;
  const REQUEST_PRICE = REQUEST_IN_CYCLE / ICP_CYCLE;

  const ONE_CREDIT_IS = NEW_GENERATE_PRICE + REQUEST_PRICE;


  const presetValues = [1, 3, 5, 10, 20, 50, 100, 200, 500, 1000];


  const creditCalculate = (value) => {
    const numValue = Number(value);
    const icp = numValue * ONE_CREDIT_IS;

    setInputCredit(numValue);
    setIcpAmount(icp);

    let e8s = Math.round(icp * 1e8);
    const transferFee = 10_000;
    e8s += transferFee;

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
      <main className="bg-primaryColor font-Poppins w-dvh min-h-screen flex flex-col ">
        <Navbar
          navbarStyle="secondary"
        />

        <section className="pt-[8dvh] w-full h-full flex flex-col items-center justify-start md:justify-center md:pt-[8dvh] overflow-y-auto">
          <div className="container">
            <div className="flex flex-col rounded-2xl items-center justify-center transition duration-200 border border-t-2 border-t-neutral-500/25 border-neutral-500/10 hover:border-neutral-500/25 bg-gradient-to-b from-white/[0.025] via-white/[0.015] to-white/[0.01] backdrop-blur-2xl p-2 md:p-10 group my-12">
              <div className="w-full md:w-1/2 h-full flex flex-col text-fontPrimaryColor items-center">
                <span className="text-xl">Topup Credit with Plug Wallet</span>
                <span>Pay as you want with anything</span>
                <div className="rounded-2xl p-4 md:p-8 mt-4 w-full border lg:flex lg:flex-col lg:justify-center bg-white">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Total Credit Want
                    </label>
                    <div className="mt-1 flex gap-x-4 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-10 fill-yellow-600"
                      >
                        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m2.75 17.61v1.89a.75.75 0 0 1-1.5 0v-1.38a5.7 5.7 0 0 1-1.25.13h-.25v1.25a.75.75 0 0 1-1.5 0v-1.25H8.5a.75.75 0 0 1-.59-.25a.73.73 0 0 1-.13-.65l2-7.5a.74.74 0 0 1 1.44.38l-1.74 6.52H12a4.75 4.75 0 0 0 0-9.5H6.5a.75.75 0 0 1 0-1.5h3.75V4.5a.75.75 0 0 1 1.5 0v1.25H12a5.7 5.7 0 0 1 1.25.13V4.5a.75.75 0 0 1 1.5 0v1.89a6.25 6.25 0 0 1 0 11.22" />
                      </svg>
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
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="size-4 fill-yellow-600"
                            >
                              <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m2.75 17.61v1.89a.75.75 0 0 1-1.5 0v-1.38a5.7 5.7 0 0 1-1.25.13h-.25v1.25a.75.75 0 0 1-1.5 0v-1.25H8.5a.75.75 0 0 1-.59-.25a.73.73 0 0 1-.13-.65l2-7.5a.74.74 0 0 1 1.44.38l-1.74 6.52H12a4.75 4.75 0 0 0 0-9.5H6.5a.75.75 0 0 1 0-1.5h3.75V4.5a.75.75 0 0 1 1.5 0v1.25H12a5.7 5.7 0 0 1 1.25.13V4.5a.75.75 0 0 1 1.5 0v1.89a6.25 6.25 0 0 1 0 11.22" />
                            </svg>
                            <span className="text-md font-medium">{value}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl p-8 mt-4 w-full border lg:flex lg:flex-col lg:justify-center bg-white">
                  <span className="text-black text-center text-lg font-medium">
                    Total Bill Payment
                  </span>
                  <div className="flex items-baseline gap-x-2 tracking-tight text-black bg-borderShade/10 border border-borderShade/10 rounded-lg px-4 py-2">
                    <span className="text-4xl font-medium">
                      {Number(icpAmount)
                        .toFixed(6)
                        .replace(/\.?0+$/, "")}
                    </span>
                    <p className="text-4xl font-medium">
                      ICP
                      <span className="text-sm font-thin">( Include Fee )</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2 mt-4">
                    <span htmlFor="pageviews" className="text-sm text-gray-500">
                      PlugWallet information:
                    </span>
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
                      <span>Pay Now</span>
                    </button>
                  </div>
                  <p className="mt-6 text-xs leading-5 text-gray-500 text-pretty">
                    This Payment automatically deducts the amount from your
                    wallet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showInvoice && paymentStatus !== "idle" && (
        <section className={`flex space-y-20 w-full h-full justify-center items-center fixed inset-0 bg-black/20 z-[999] backdrop-blur-sm place-items-center transition-opacity duration-300`}>
          <div className="relative max-w-[38rem] min-h-[16rem] w-[90%] place-content-center place-items-center text-center rounded-xl opacity-95 hover:opacity-100 transition-opacity duration-200 bg-primaryColor overflow-hidden shadow-[0.063em_0.75em_1.563em_rgba(0,0,0,0.78)]">
            <div className="w-full flex">

              {/* button close */}
              <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-end px-3 pt-3 z-50">
                <button
                  onClick={() => { setShowInvoice(false) }}
                  hidden={paymentStatus === "processing"}
                  className='p-1 rounded-full aspect-square bg-transparent group hover:bg-neutral-800/10'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className="w-6 cursor-pointer text-white/50 group-hover:text-white/80 stroke-[2px] fill-none">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* gradient */}
              <div className={`w-full h-full absolute -z-0 bg-[radial-gradient(ellipse_at_right_top,_#0c4a6e_0%,_#151419_47%,_#151419_100%)]`}></div>


              <div className='w-full h-full flex flex-col relative p-8 text-fontPrimaryColor'>
                <span className="text-center text-lg font-medium">
                  PlugWallet
                </span>
                <span htmlFor="pageviews" className="text-md text-fontPrimaryColor/80">
                  Bill information
                </span>
                <div className="w-full text-center space-y-4 text-white mt-10">
                  <div className="w-full flex flex-col items-center md:px-10">

                    <span className="text-lg font-semibold text-accentColor">
                      Validate Payment
                    </span>
                    <span className="mt-2 text-sm/4 text-fontPrimaryColor/70">
                      We are verifying your Plug Wallet payment. This process may take
                      a moment as we securely process and confirm your transaction.
                    </span>
                  </div>
                  {paymentStatus === "processing" ? (
                    <>

                      <div className="relative flex flex-col place-items-center items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="size-[70%] opacity-30"
                        >
                          <path
                            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                            transform="matrix(0 0 0 0 12 12)"
                            className="fill-accentColor/70"
                          >
                            <animateTransform
                              id="svgSpinnersPulseRingsMultiple0"
                              attributeName="transform"
                              begin="0;svgSpinnersPulseRingsMultiple2.end"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              type="translate"
                              values="12 12;0 0"
                            />
                            <animateTransform
                              additive="sum"
                              attributeName="transform"
                              begin="0;svgSpinnersPulseRingsMultiple2.end"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              type="scale"
                              values="0;1"
                            />
                            <animate
                              attributeName="opacity"
                              begin="0;svgSpinnersPulseRingsMultiple2.end"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="1;0"
                            />
                          </path>
                          <path
                            className="fill-accentColor/85"
                            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                            transform="matrix(0 0 0 0 12 12)"
                          >
                            <animateTransform
                              id="svgSpinnersPulseRingsMultiple1"
                              attributeName="transform"
                              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              type="translate"
                              values="12 12;0 0"
                            />
                            <animateTransform
                              additive="sum"
                              attributeName="transform"
                              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              type="scale"
                              values="0;1"
                            />
                            <animate
                              attributeName="opacity"
                              begin="svgSpinnersPulseRingsMultiple0.begin+0.2s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="1;0"
                            />
                          </path>
                          <path
                            className="fill-accentColor/100"
                            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"
                            transform="matrix(0 0 0 0 12 12)"
                          >
                            <animateTransform
                              id="svgSpinnersPulseRingsMultiple2"
                              attributeName="transform"
                              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              type="translate"
                              values="12 12;0 0"
                            />
                            <animateTransform
                              additive="sum"
                              attributeName="transform"
                              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              type="scale"
                              values="0;1"
                            />
                            <animate
                              attributeName="opacity"
                              begin="svgSpinnersPulseRingsMultiple0.begin+0.4s"
                              calcMode="spline"
                              dur="1.2s"
                              keySplines=".52,.6,.25,.99"
                              values="1;0"
                            />
                          </path>
                        </svg>

                        <div className="absolute animate-pulse text-center text-lg font-semibold text-fontPrimaryColor/25 z-5 flex flex-col">
                          <span>Waiting for Plug Wallet Payment</span>
                          <span>Validation</span>
                        </div>
                      </div>

                      <span className="text-sm text-fontPrimaryColor/70">Don't Close This Window</span>
                    </>
                  ) : paymentStatus === "success" ? (
                    <>
                      <div className="flex flex-col items-center py-10 md:py-20 place-content-center">
                        <svg
                          className="w-16 h-16 text-green-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.707 9.293-6.364 6.364a1 1 0 0 1-1.414 0l-2.828-2.828a1 1 0 0 1 1.414-1.414l2.121 2.121 5.657-5.657a1 1 0 0 1 1.414 1.414z" />
                        </svg>
                        <span className="text-lg font-semibold mt-4 text-green-400">
                          Payment Success
                        </span>
                        <div className="text-sm text-fontPrimaryColor/70 mt-8">
                          <p>TxID: {txStatus?.txId || " - "}</p>
                          <p>Memo: {txStatus?.memo || " - "}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setPaymentStatus("idle")}
                        className="mt-4 w-full rounded-md bg-accentColor px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-accentColor2"
                      >
                        Back
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col items-center py-10 md:py-20 place-content-center">
                        <svg
                          className="w-14 h-14 text-red-500 mb-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5 15.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z" />
                        </svg>
                        <span className="text-lg font-semibold text-red-500">
                          Payment Failed
                        </span>
                        <span className="text-sm text-fontPrimaryColor/70 content-end">
                          Payment failed. Please try again or check your wallet balance.
                        </span>
                      </div>
                      <button
                        onClick={() => setPaymentStatus("idle")}
                        className="mt-4 w-full rounded-md bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-gray-800"
                      >
                        Close
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CreditPaymentPage;
