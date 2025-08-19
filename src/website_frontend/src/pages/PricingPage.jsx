import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/sectionHomePage/Footer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const plans = [
  {
    key: "Basic",
    name: "Basic",
    price: 0,
    credit: 3,
    description: "Perfect for new users who want to explore AI services.",
    features: ["Limited access to basic AI models", "3 requests per day"],
    buttonText: "Free",
  },
  {
    key: "Premium",
    name: "Premium",
    price: 200000,
    credit: 50,
    description: "Designed for active users who need advanced features.",
    features: [
      "Full access to basic and advanced AI models",
      "100+ requests per day",
      "Usage history saved",
      "Priority customer support",
    ],
    buttonText: "Upgrade to Premium",
  },
  {
    key: "Ultimate",
    name: "Ultimate",
    price: 500000,
    credit: 100,
    description: "A complete solution for organizations, and teams.",
    features: [
      "All Premium features included",
      "Custom API integration",
      "Full model customization",
    ],
    buttonText: "Upgrade to Ultimate",
  },
];

const allFeatures = [
  "Limited access to basic AI models",
  "Full access to basic and advanced AI models",
  "100+ requests per day",
  "Usage history saved",
  "Priority customer support",
  "All Premium features included",
  "Custom API integration",
  "Full model customization",
];

const faqs = [
  {
    question: "What is this AI image generation service?",
    answer:
      "This service allows you to generate high-quality images from text prompts or uploaded images using advanced AI models.",
  },
  {
    question: "How do I use the image generator?",
    answer:
      "Simply upload an image or enter a text prompt, choose a style, and click generate. The AI will create an image based on your input.",
  },
  {
    question: "Is my data stored?",
    answer:
      "We do not store your data without permission. If you are logged in, your generation history may be saved for your convenience.",
  },
  {
    question: "How much does it cost?",
    answer:
      "We offer both free and paid plans. Please visit the 'Pricing' section for full details.",
  },
  {
    question: "Who owns the generated images?",
    answer:
      "You have full rights to use, modify, and share the images you generate, even for commercial purposes, unless stated otherwise.",
  },
  {
    question: "Are the generated images copyrighted?",
    answer:
      "Generated images are not copyrighted by us. However, it is your responsibility to ensure that the generated content does not infringe on third-party rights.",
  },
  {
    question: "How long does it take to generate an image?",
    answer:
      "Image generation typically takes a few seconds, depending on the complexity of the prompt and the chosen style.",
  },
  {
    question: "Can I integrate this service with my own app or website?",
    answer:
      "Yes, API access is available in certain plans. Please check the 'Pricing' section or contact us for integration options.",
  },
];

const PricingPage = () => {
  const {
    TopupCredit,
    credit,
    principalId,
    clientId,
    accountId,
    Login,
    isLoggedIn,
    Logout,
    tier,
  } = useAuth();

  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [icpInE8s, setIcpInE8s] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [txStatus, setTxStatus] = useState(null);

  const ICP_PRICE_USD = 6.2;
  const GENERATE_PRICE = 0.1;
  const NEW_GENERATE_PRICE = GENERATE_PRICE / ICP_PRICE_USD;

  const ICP_PRICE_XDR = 4.2;
  const ICP_CYCLE = ICP_PRICE_XDR * 1_000_000_000_000;
  const REQUEST_IN_CYCLE = 10_800_000_000;
  const REQUEST_PRICE = REQUEST_IN_CYCLE / ICP_CYCLE;

  const ONE_CREDIT_IS = NEW_GENERATE_PRICE + REQUEST_PRICE;

  const transferFee = 10_000;
  const navigate = useNavigate();

  const creditCalculate = (credit) => {
    const icp = credit * ONE_CREDIT_IS;
    const icpInE8s = Math.round(icp * 1e8);

    const e8s = icpInE8s + transferFee;

    return { icp, e8s };
  };

  const tierPriority = {
    Basic: 0,
    Premium: 1,
    Ultimate: 2,
  };

  const convertIdrToIcp = (idrPrice) => {
    const USD_RATE = 16000;
    const ICP_PRICE_USD = 6.2;

    const usd = idrPrice / USD_RATE;
    const icp = usd / ICP_PRICE_USD;

    return icp.toFixed(2);
  };

  const handleBuyying = (plan) => {
    if (!isLoggedIn) {
      return Swal.fire({
        title: "Please log in",
        text: "You need to log in to continue.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          Login();
          Swal.fire("Login successful!", "", "success").then(() => {
            navigate("/pricing-plan");
          });
        }
      });
    }

    const { icp, e8s } = creditCalculate(plan.credit);

    setSelectedPlan(plan);
    setIcpInE8s(e8s);
    setShowInvoice(true);
  };

  const handlePayment = async () => {
    try {
      setPaymentStatus("processing");

      if (!icpInE8s || isNaN(icpInE8s)) {
        throw new Error("Invalid ICP amount (e8s)");
      }

      const txResult = await TopupCredit(icpInE8s, "plan", 0, selectedPlan.key);

      if (txResult.status === "success") {
        setTxStatus(txResult);
        setPaymentStatus(txResult.status);
        setShowInvoice(false);
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

  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const shouldShowButton = (userTier, planKey, isLoggedIn) => {
    if (!isLoggedIn) return true;

    return tierPriority[userTier] < tierPriority[planKey];
  };


  return (
    <div className="bg-primaryColor flex min-h-screen w-full flex-col justify-center">
      <Navbar
        navbarStyle="secondary"
        principalId={principalId}
        isLoggedIn={isLoggedIn}
        credit={credit}
        Login={Login}
        Logout={Logout}
        tier={tier}
      />

      <div className="pt-[8dvh] flex flex-col items-center justify-start md:pt-[70px] mb-[435px] mt-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-center text-fontPrimaryColor">
            Choose Your Plan
          </h1>
          <p className="text-gray-400">Get features that suit your needs</p>
        </div>



        <div className="w-[90%] lg:w-[60%] min-w-40 min-h-[250px] ">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-secondaryColor rounded-xl flex flex-col justify-between text-center p-6 border border-borderShade border-opacity-40"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start gap-4">
                    <h2 className="text-3xl  text-fontPrimaryColor">
                      {plan.name}
                    </h2>
                    <p className="text-xl text-accentColor">
                      {plan.price === 0
                        ? "Free"
                        : `${convertIdrToIcp(plan.price)} ICP / Mo`}
                    </p>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>

                  <div className="flex w-full justify-center items-center">
                    <button
                      className={`${shouldShowButton(tier, plan.key, isLoggedIn) ? "w-full" : "hidden"} bg-accentColor flex items-center justify-center gap-x-4 rounded-full px-4 py-[10px] text-sm font-medium text-white  hover:bg-accentColor/80`}
                      onClick={() => handleBuyying(plan)}
                    >
                      {plan.buttonText}
                    </button>
                  </div>

                  <ul className="text-left space-y-2 px-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-accentColor font-bold text-base">
                          ✓
                        </span>
                        <p className="text-md text-fontPrimaryColor/70">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <h1 className="text-4xl font-bold mb-6 text-center text-fontPrimaryColor">
              Compare Plans
            </h1>
            <div className="overflow-x-auto rounded-2xl border border-borderShade border-opacity-40 relative ">
              <div className="w-full flex border-b-2 border-borderShade border-opacity-40 p-4">
                <div className="w-[25%] py-4"></div>
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-[25%] justify-center items-center py-4 text-fontPrimaryColor gap-2"
                  >
                    <div className="mb-4 font-bold text-xl">{plan.name}</div>
                    <div>
                      {plan.price === 0
                        ? "Free"
                        : `${convertIdrToIcp(plan.price)} ICP / Mo`}
                    </div>

                    <div className="flex w-full justify-center items-center">
                      <button
                        className={`${shouldShowButton(tier, plan.key, isLoggedIn) ? "w-80%" : "hidden"} bg-accentColor flex items-center justify-center gap-x-4 rounded-full px-4 py-[10px] text-sm font-medium text-white  hover:bg-accentColor/80`}
                        onClick={() => handleBuyying(plan)}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 ">
                <div className="w-full flex flex-col gap-5 text-xl">
                  {allFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? "bg-primaryColor" : "bg-neutral-600/80"
                      } flex flex-row rounded-xl w-full`}
                    >
                      <div className="p-4 text-left font-medium text-fontPrimaryColor w-[25%]">
                        {feature}
                      </div>

                      {plans.map((plan, pi) => {
                        const isAvailable = plan.features.includes(feature);
                        return (
                          <div
                            key={pi}
                            className="text-center p-4 w-[25%] flex items-center justify-center"
                          >
                            <span
                              className={`text-2xl font-bold ${
                                isAvailable ? "text-green-500" : "text-red-400"
                              }`}
                            >
                              {isAvailable ? ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0"/></g></svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z"/></g></svg>)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="mt-20 flex flex-col">
            <div className="">
              <h1 className="text-5xl font-bold text-center text-fontPrimaryColor">
                FAQ
              </h1>
            </div>
            <div className="mt-20 grid grid-cols-1 md:grid-cols-7 gap-4">
              <h2 className="text-4xl font-bold text-center md:text-left text-fontPrimaryColor mb-10 md:col-span-3 md:pr-24">
                Frequently asked questions.
              </h2>

              <div className="space-y-4 md:col-span-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-primaryColor rounded-xl border-2 border-borderShade border-opacity-40 transition-all duration-300 overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(idx)}
                        className="w-full flex justify-between items-center p-4 text-left text-lg text-fontPrimaryColor font-bold"
                      >
                        <span>{faq.question}</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m6 9l6 6l6-6"
                          />
                        </svg>
                      </button>

                      <div
                        className={`px-4 transition-all duration-500 ease-in-out ${
                          isOpen
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-2 text-md bg-borderShade/80 rounded-md text-fontPrimaryColor mb-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />

      {showInvoice && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-2xl p-8 mt-4 max-w-4xlw-full border lg:flex lg:flex-col lg:justify-center bg-white">
            <span className="text-black text-center text-lg font-medium">
              Total Bill Payment
            </span>
            <div className="flex items-baseline gap-x-2 tracking-tight text-black bg-borderShade/10 border border-borderShade/10 rounded-lg px-4 py-2">
              <span className="text-4xl font-medium">{}</span>
              <p className="text-4xl font-medium">
                {convertIdrToIcp(selectedPlan.price)}
                <span className="ml-2">ICP</span>
                <span className="text-sm font-thin"> ( Include Fee )</span>
              </p>
            </div>
            <div className="flex flex-col gap-y-2 mt-4">
              <span htmlFor="pageviews" className="text-sm text-gray-500">
                PlugWallet information:
              </span>
              <div className="flex w-full h-full gap-x-2">
                <div className="flex overflow-hidden  flex-col flex-1 border rounded-lg text-black text-xs md:text-sm justify-start gap-x-1 gap-y-2 p-1">
                  <div className="w-full flex i justify-center ">From:</div>
                  <div className="justify-center truncate bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md">
                    {clientId}
                  </div>
                  <div className="w-full flex i justify-center ">To:</div>
                  <div className="justify-center truncate bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md">
                    {accountId}
                  </div>
                  <p className="mb-2">
                    Plan: <strong>{selectedPlan.key}</strong>
                  </p>
                  <p className="mb-4">
                    ICP: <strong>{convertIdrToIcp(selectedPlan.price)}</strong>
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm lg:text-pretty mt-8 text-gray-500">
              This plan is tailored for small businesses and startups
            </p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-accentColor text-white rounded w-full"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>
            <p className="mt-6 text-xs leading-5 text-gray-500 text-pretty">
              This Payment automatically deducts the amount from your wallet
            </p>
          </div>
        </div>
      )}

      {paymentStatus !== "idle" && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 md:p-10 w-11/12 md:w-1/2 lg:w-1/3 text-center space-y-4">
            <div className="w-full flex flex-col items-center">
              <span className="text-xl font-semibold text-accentColor">
                Validate PlugWallet Payment
              </span>
              <span className="mt-4 text-sm/4 text-borderShade/70">
                We are verifying your Plug Wallet payment. This process may take
                a moment as we securely process and confirm your transaction.
              </span>
            </div>
            {paymentStatus === "processing" && (
              <>
                <div className="relative flex flex-col items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="opacity-30"
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

                  <div className="absolute animate-pulse text-center text-lg font-semibold text-gray-800 z-5 flex flex-col">
                    <span>Waiting PlugWallet Payment</span>
                    <span>Validation</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500">Dont Close This Window.</p>
              </>
            )}

            {paymentStatus === "success" && (
              <>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-16 h-16 text-green-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5.707 9.293-6.364 6.364a1 1 0 0 1-1.414 0l-2.828-2.828a1 1 0 0 1 1.414-1.414l2.121 2.121 5.657-5.657a1 1 0 0 1 1.414 1.414z" />
                  </svg>
                  <h2 className="text-lg font-semibold mt-4 text-green-700">
                    Payment Success
                  </h2>
                  <div className="text-sm text-gray-600 mt-2">
                    <p>TxID: {txStatus?.txId || "N/A"}</p>
                    <p>Memo: {txStatus?.memo || "N/A"}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPaymentStatus("idle")}
                  className="mt-4 w-full rounded-full bg-accentColor px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-accentColor2"
                >
                  Back
                </button>
              </>
            )}
            {(paymentStatus === "reject") | (paymentStatus === "timeout") && (
              <>
                <div className="flex flex-col items-center">
                  <svg
                    className="w-14 h-14 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm5 15.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z" />
                  </svg>
                  <h2 className="text-lg font-semibold text-red-600">
                    Payment Failed
                  </h2>
                  <p className="text-sm text-gray-600">
                    Something went wrong, please try again
                  </p>
                </div>
                <button
                  onClick={() => setPaymentStatus("idle")}
                  className="mt-4 w-full rounded-full bg-gray-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-gray-800"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
