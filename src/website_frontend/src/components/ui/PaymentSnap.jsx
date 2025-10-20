import React from "react";
import Button from "./Button";

const PaymentSnap = ({
  paymentStatus,
  setPaymentStatus,
  showInvoice,
  setShowInvoice,
  authClient,
}) => {
  return (
    <>
      {showInvoice && paymentStatus !== "idle" && (
        <section
          className={`flex space-y-20 w-full h-full justify-center items-center fixed inset-0 bg-black/20 z-10 backdrop-blur-sm place-items-center transition-opacity duration-300`}
        >
          <div className="relative max-w-[38rem] min-h-[16rem] w-[90%] place-content-center place-items-center text-center rounded-xl opacity-95 hover:opacity-100 transition-opacity duration-200 bg-primaryColor overflow-hidden shadow-[0.063em_0.75em_1.563em_rgba(0,0,0,0.78)]">
            <div className="w-full flex">
              <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-end px-3 pt-3 z-50">
                <button
                  onClick={() => {
                    setShowInvoice(false);
                  }}
                  hidden={paymentStatus === "processing"}
                  className="p-1 rounded-full aspect-square bg-transparent group hover:bg-neutral-800/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 cursor-pointer text-white/50 group-hover:text-white/80 stroke-[2px] fill-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* gradient */}
              <div
                className={`w-full h-full absolute -z-0 bg-[radial-gradient(ellipse_at_right_top,_#0c4a6e_0%,_#151419_47%,_#151419_100%)]`}
              ></div>

              <div className="w-full h-full flex flex-col relative p-8 text-fontPrimaryColor">
                <span className="text-center text-lg font-medium">
                  {authClient.provider === "Plug"
                    ? "Plug Wallet"
                    : "Internet Identity"}
                </span>
                <span
                  htmlFor="pageviews"
                  className="text-md text-fontPrimaryColor/80"
                >
                  Bill information
                </span>
                <div className="w-full text-center space-y-4 text-white mt-10">
                  <div className="w-full flex flex-col items-center md:px-10">
                    <span className="text-lg font-semibold text-accentColor">
                      Validate Payment
                    </span>
                    <span className="mt-2 text-sm/4 text-fontPrimaryColor/70">
                      We are verifying your{" "}
                      {authClient.provider === "Plug"
                        ? "Plug Wallet"
                        : "Internet Identity"}{" "}
                      payment. This process may take a moment as we securely
                      process and confirm your transaction.
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
                          <span>
                            Waiting for{" "}
                            {authClient.provider === "Plug"
                              ? "Plug Wallet"
                              : "Internet Identity"}{" "}
                            Payment
                          </span>
                          <span>Validation</span>
                        </div>
                      </div>

                      <span className="text-sm text-fontPrimaryColor/70">
                        Don't Close This Window
                      </span>
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
                      </div>
                      <Button type="primary" onClick={() => setPaymentStatus("idle")} withIcon centering className="w-full">
                        <div className="h-6 flex items-center justify-center text-center space-x-2">
                          <span>Back</span>
                        </div>
                      </Button>
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
                          Payment failed. Please try again or check your wallet
                          balance.
                        </span>
                      </div>
                      <Button type="primary" onClick={() => setPaymentStatus("idle")} withIcon centering className="w-full">
                        <div className="h-6 flex items-center justify-center text-center space-x-2">
                          <span>Close</span>
                        </div>
                      </Button>
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
export default PaymentSnap;
