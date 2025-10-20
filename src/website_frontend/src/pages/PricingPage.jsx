import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import Navbar from "../components/layout/Navbar";
import { Box, Container } from "../components/layout/Container";
import GettingStarted from "../components/layout/sectionHomePage/GettingStarted";
import { usePopup } from "../provider/PopupProvider";
import Footer from "../components/layout/Footer";



const plans = [
  {
    key: "Basic",
    name: "Basic",
    price: 0,
    credit: 3,
    description: "Perfect for new users who want to explore AI services.",
    features: [
      "Mint Token",
      "Limited access to basic AI models",
      "Includes 3 DYA Token",
      "Maximum 3 Generate History Saved",
    ],
    buttonText: "Free",
  },
  {
    key: "Premium",
    name: "Premium",
    price: 12.10,
    credit: 25,
    description: "Designed for active users who need advanced features.",
    features: [
      "Mint Token",
      "Full access to basic and advanced AI models",
      "Includes 25 DYA Token",
      "Unlimited Generate history saved",
      "Priority customer support",
    ],
    buttonText: "Upgrade",
  },
  {
    key: "Ultimate",
    name: "Ultimate",
    price: 18.14,
    credit: 50,
    description: "A complete solution for organizations, and teams.",
    features: [
      "Mint Token",
      "All Premium features included",
      "Full access to basic and advanced AI models",
      "Includes 50 DYA Token",
      "Unlimited Generate history saved",
      "Priority customer support",
      "Custom API integration",
      "Full model customization",
    ],
    buttonText: "Upgrade",
  },
];

const allFeatures = [
  "Mint Token",
  "Unlimited Generate history saved",
  "Full access to basic and advanced AI models",
  "Priority customer support",
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

const getHeadBg = (key) => {
  switch (key) {
    case "Basic":
      return "from-gray-700 via-gray-600";
    case "Premium":
      return "from-yellow-600/60 via-amber-500/85";
    case "Ultimate":
      return "from-blue-700 via-blue-600";
    default:
      return "bg-gray-100";
  }
};

const getBadgeText = (key) => {
  switch (key) {
    case "Basic":
      return "Best for Starters";
    case "Premium":
      return "Most Popular";
    case "Ultimate":
      return "For Teams & Organizations";
    default:
      return "";
  }
};

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
    authClient,
  } = useAuth();
  const { showPopup, hidePopup } = usePopup();

  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [icpInE8s, setIcpInE8s] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [txStatus, setTxStatus] = useState(null);

  const ICP_PRICE_USD = 6.2;

  const transferFee = 10_000;

  const tierPriority = {
    Basic: 0,
    Premium: 1,
    Ultimate: 2,
  };

  const convertUsdToIcp = (usdPrice) => {
    const icp = usdPrice / ICP_PRICE_USD;
    const icpInE8s = Math.round(icp * 1e8);
    const e8s = icpInE8s + transferFee;

    return { icp, e8s };
  };

  const handlePayment = (plan) => {
    if (!isLoggedIn) {
      showPopup({
        title: "Login Required",
        message: "To use this feature, please log in first. Once you are logged in, you can connect and continue using this feature.",
        type: "warning",
        leftLabel: "Login",
        onLeft: async () => {
          Login();
        },
        rightLabel: "Cancel",
        onRight: () => { hidePopup() },
      });
      return;
    }

    const { e8s } = convertUsdToIcp(plan.price);

    setSelectedPlan(plan);
    setIcpInE8s(e8s);
    setShowInvoice(true);
  };

  const paymentConfirmation = async () => {
    try {
      setPaymentStatus("processing");

      if (!icpInE8s || isNaN(icpInE8s)) {
        throw new Error("Invalid ICP amount (e8s)");
      }

      console.log('icpInE8s :>> ', icpInE8s);

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
    <div className="flex mflex h-full w-full flex-col items-center justify-center">
      <Navbar
        navbarStyle="secondary" />

      <Container id="plan" className="flex flex-col items-center mt-[40dvh] space-y-60">
        <section>
          <div className="text-center mb-40 space-y-10">
            <h1 className="text-4xl font-bold text-center text-fontPrimaryColor">
              Choose Your Plan
            </h1>
            <p className="text-gray-400">
              Upgrade your experience and unlock the full power of AI with the right plan for you.
            </p>
          </div>

          {/* section choose plan */}
          <div className="w-full flex flex-col md:flex-row justify-center lg:grid-cols-3 gap-4 lg:gap-10">
            {plans.map((plan, index) => (
              <Box key={index}
                className="p-2 md:p-4 lg:p-6 xl:p-6 scale-100 hover:scale-[101%] transition-transform duration-200 hover:drop-shadow-[0.2rem_0.5rem_0.8rem_0.2rem_#d1d5db]"
                cursorHover >
                <div className="flex flex-col space-y-8 h-full w-full">
                  {/* haed */}
                  <div className={`relative flex flex-col items-start p-2 rounded-md rounded-se-3xl overflow-hidden bg-gradient-to-tr ${getHeadBg(plan.key)}`}>
                    {/* plan head */}
                    <div className="w-full py-2 flex flex-col space-y-4 mb-10">
                      <div className="flex flex-col">
                        <span className="text-3xl font-medium text-fontPrimaryColor">
                          {plan.name}
                        </span>
                        <span className={`mt-1 text-xs font-medium rounded-md px-2 py-1 w-max backdrop-blur-md bg-white/10 border border-white/10 text-white/80`}>
                          {getBadgeText(plan.key)}
                        </span>
                      </div>
                      <span className="text-sm text-white/70">{plan.description}</span>

                      {/* price */}
                      <div className="absolute bottom-0 right-0 bg-white/5 backdrop-blur-lg pl-2 pr-1 py-2 rounded-ss-lg text-white/80 flex gap-x-1 w-fit items-end">
                        <div className="flex items-start">

                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 -mt-0.5 text-accentColor">
                            <path
                              fill="currentColor"
                              d="M12 2c-.552 0-1 .448-1 1v1.07c-2.282.243-4 2.068-4 4.28 0 1.933 1.567 3.5 3.5 3.5h2a1.5 1.5 0 1 1 0 3h-3a1 1 0 0 0 0 2h1v1.07c0 .552.448 1 1 1s1-.448 1-1V17c2.282-.243 4-2.068 4-4.28 0-1.933-1.567-3.5-3.5-3.5h-2a1.5 1.5 0 1 1 0-3h3a1 1 0 0 0 0-2h-1V3c0-.552-.448-1-1-1z"
                            />
                          </svg>

                          <span className="text-xl/5 font-semibold text-accentColor h-fit">
                            {plan.price}
                          </span>
                        </div>
                        <div className="flex gap-x-1 items-center">
                          <span className="text-xs font-light">per Month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4 px-2">
                    <div className="flex flex-col">
                      <span className="text-fontPrimaryColor text-base font-semibold">
                        What's Inside
                      </span>
                      <p className="text-xs text-fontPrimaryColor/70">
                        This plan gives you access to:
                      </p>

                    </div>
                    <ul className="text-left space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="ml-1 flex items-start justify-start gap-x-2">

                          <div className="size-fit h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 text-accentColor">

                              <path fill="currentColor" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.523-3.308a.75.75 0 0 0-1.048.169l-3.597 4.981a.25.25 0 0 1-.391.018l-1.506-1.72a.75.75 0 1 0-1.129.987l1.506 1.721a1.75 1.75 0 0 0 2.736-.128l3.597-4.98a.75.75 0 0 0-.168-1.048" />
                            </svg>
                          </div>
                          <p className="text-sm text-fontPrimaryColor/90 leading-tight">
                            {feature}
                          </p>

                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col w-full justify-center items-center py-8">
                  <button
                    className={`${shouldShowButton(tier, plan.key, isLoggedIn) ? "bg-accentColor hover:bg-accentColor/80 cursor-pointer" : "bg-neutral-600 cursor-not-allowed"} w-full flex items-center justify-center gap-x-4 rounded-full px-4 py-[10px] text-sm font-medium text-white `}
                    onClick={() => handlePayment(plan)} disabled={!shouldShowButton(tier, plan.key, isLoggedIn)}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </Box>

            ))}
          </div>
        </section>



        {/* section compare */}
        <section className="w-full">

          <div className="text-center mb-20 space-y-10">
            <span className="text-4xl font-bold mb-6 text-center text-fontPrimaryColor">
              Compare Plans
            </span>
          </div>

          {/* compare content */}
          <div className=" w-full overflow-x-auto rounded-2xl border border-borderShade border-opacity-40">
            <div className="w-full flex border-b border-borderShade/60 border-opacity-40 px-2 py-4">
              <div className="w-1/4"></div>
              {plans.map((plan, index) => (
                <div key={index}
                  className="w-1/4 px-2">

                  <div className={`relative flex flex-col items-start p-2 rounded-lg rounded-ss-3xl overflow-hidden bg-gradient-to-tr ${getHeadBg(plan.key)}`}>

                    <span className="text-xl font-medium text-fontPrimaryColor py-4">
                      {plan.name}
                    </span>

                    {/* price */}
                    <div className="border border-white/10 bottom-0 right-0 bg-white/5 backdrop-blur-lg px-4 py-2 rounded-md flex gap-x-1 w-fit items-end">
                      <div className="flex items-start">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-3 -mt-0.5 text-accentColor">
                          <path
                            fill="currentColor"
                            d="M12 2c-.552 0-1 .448-1 1v1.07c-2.282.243-4 2.068-4 4.28 0 1.933 1.567 3.5 3.5 3.5h2a1.5 1.5 0 1 1 0 3h-3a1 1 0 0 0 0 2h1v1.07c0 .552.448 1 1 1s1-.448 1-1V17c2.282-.243 4-2.068 4-4.28 0-1.933-1.567-3.5-3.5-3.5h-2a1.5 1.5 0 1 1 0-3h3a1 1 0 0 0 0-2h-1V3c0-.552-.448-1-1-1z"
                          />
                        </svg>

                        <span className="text-lg/5 font-semibold text-accentColor h-fit">
                          {`${plan.price}`}
                        </span>
                      </div>
                      <div className="flex gap-x-1 items-center">
                        <span className="text-xs font-light text-white/80">per Month</span>
                      </div>
                    </div>

                    {/* button */}
                    <div className="w-full flex justify-end bottom-0 right-0">
                      <button
                        className={`${shouldShowButton(tier, plan.key, isLoggedIn) ? "scale-100 hover:scale-[110%] transition-transform duration-200 drop-shadow-xl cursor-pointer" : "cursor-not-allowed"} flex items-center justify-center gap-x-2 rounded-lg font-medium`}
                        onClick={() => handlePayment(plan)}
                        disabled={!shouldShowButton(tier, plan.key, isLoggedIn)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`size-12 ${shouldShowButton(tier, plan.key, isLoggedIn) ? "fill-accentColor" : "fill-neutral-300"}`}>
                          <path d="M9.367 2.25h5.266c1.092 0 1.958 0 2.655.057c.714.058 1.317.18 1.869.46a4.75 4.75 0 0 1 2.075 2.077c.281.55.403 1.154.461 1.868c.057.697.057 1.563.057 2.655v5.266c0 1.092 0 1.958-.057 2.655c-.058.714-.18 1.317-.46 1.869a4.75 4.75 0 0 1-2.076 2.075c-.552.281-1.155.403-1.869.461c-.697.057-1.563.057-2.655.057H9.367c-1.092 0-1.958 0-2.655-.057c-.714-.058-1.317-.18-1.868-.46a4.75 4.75 0 0 1-2.076-2.076c-.281-.552-.403-1.155-.461-1.869c-.057-.697-.057-1.563-.057-2.655V9.367c0-1.092 0-1.958.057-2.655c.058-.714.18-1.317.46-1.868a4.75 4.75 0 0 1 2.077-2.076c.55-.281 1.154-.403 1.868-.461c.697-.057 1.563-.057 2.655-.057m-1.08 6.038a.75.75 0 0 0 0 1.06l5.084 5.084h-3.139a.75.75 0 0 0 0 1.5h4.95a.75.75 0 0 0 .75-.75v-4.95a.75.75 0 0 0-1.5 0v3.14L9.348 8.287a.75.75 0 0 0-1.06 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full p-2 md:p-4 ">
              <div className="w-full flex flex-col space-y-4">
                {allFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-row rounded-lg w-full h-[5rem] bg-gradient-to-l hover:from-neutral-500/10 hover:to-transparent bg-opacity-0 hover:bg-opacity-5 transition duration-300 border border-borderShade/30 items-center gap-2 border-separate pl-2`}
                  >

                    {/* feature name */}
                    <div className="w-[25%] h-full flex items-center">

                      <span className="text-base md:text-md font-medium text-fontPrimaryColor">{feature}</span>
                    </div>

                    {/* availability */}
                    {plans.map((plan, pi) => {
                      const isAvailable = plan.features.includes(feature);
                      return (
                        <div
                          key={pi}
                          className="text-center w-[25%] flex items-center justify-center rounded-lg h-full"
                        >
                          <span
                            className={`text-2xl font-bold ${isAvailable ? "text-green-500" : "text-red-400"
                              }`}
                          >
                            {
                              isAvailable ?
                                (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6" >
                                    <g fill="none" fillRule="evenodd">
                                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />

                                      <path fill="currentColor" d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0" />
                                    </g>
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6">
                                    <g fill="none" fillRule="evenodd">
                                      <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                      <path fill="currentColor" d="m12 14.122l5.303 5.303a1.5 1.5 0 0 0 2.122-2.122L14.12 12l5.304-5.303a1.5 1.5 0 1 0-2.122-2.121L12 9.879L6.697 4.576a1.5 1.5 0 1 0-2.122 2.12L9.88 12l-5.304 5.304a1.5 1.5 0 1 0 2.122 2.12z" />
                                    </g>
                                  </svg>
                                )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* section faq */}
        <section id="faqs" className="mt-20 flex flex-col">

          <div className="text-center mb-20 space-y-10">
            <span className="text-4xl font-bold mb-6 text-center text-fontPrimaryColor">
              FAQ
            </span>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-7 gap-4">
            <span className="text-4xl font-bold text-center md:text-left text-fontPrimaryColor mb-10 md:col-span-3 md:pr-24">
              Frequently asked questions.
            </span>

            <div className="space-y-4 md:col-span-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <Box
                    key={idx}
                    cursorHover
                    padding
                    className="z-10 rounded-md transition-all duration-300 overflow-hidden cursor-pointer p-4"
                  >
                    <button
                      onClick={() => { toggle(idx) }}
                      className="w-full flex flex-col justify-between items-center text-left text-fontPrimaryColor/70"
                    >
                      <div className="w-full flex justify-between gap-x-2">
                        <div className="w-full flex flex-col justify-center">

                          {/* asked */}
                          <span className="text-lg text-fontPrimaryColor/80">
                            {faq.question}
                          </span>

                          {/* question */}
                          <div
                            className={`transition-all duration-500 ease-in-out ${isOpen
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 my-0 opacity-0"
                              }`}
                          >
                            <div className="my-4 p-2 border border-neutral-500/10 bg-accentColor/[0.035] rounded-md ">
                              <span className="text-base/5 text-fontPrimaryColor leading-relaxed">
                                {faq.answer}
                              </span>
                            </div>
                          </div>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className={`stroke-fontPrimaryColor/25 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        >
                          <path
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="m6 9l6 6l6-6"
                          />
                        </svg>
                      </div>
                    </button>

                  </Box>
                );
              })}
            </div>
          </div>
        </section>
      </Container>

      <GettingStarted />
      <Footer />


      {/* Popup */}
      {showInvoice && selectedPlan && (
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
                  {authClient.provider === "Plug" ? "Plug Wallet" : "Internet Identity"}
                </span>
                <span htmlFor="pageviews" className="text-md text-fontPrimaryColor/80">
                  Bill information
                </span>


                {paymentStatus !== "idle" ? (
                  <div className="w-full text-center space-y-4 text-white mt-10">
                    <div className="w-full flex flex-col items-center md:px-10">

                      <span className="text-lg font-semibold text-accentColor">
                        Validate Payment
                      </span>
                      <span className="mt-2 text-sm/4 text-fontPrimaryColor/70">
                        We are verifying your {authClient.provider === "Plug" ? "Plug Wallet" : "Internet Identity"} payment. This process may take
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
                            <span>Waiting for {authClient.provider === "Plug" ? "Plug Wallet" : "Internet Identity"} Payment</span>
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
                ) : (
                  <>
                    <div className="flex flex-col gap-x-2 gap-y-2 mt-4 w-full h-full">
                      <div className="flex flex-col overflow-hidden flex-1 border border-borderShade/70 rounded-lg backdrop-blur-md text-fontPrimaryColor text-xs md:text-sm justify-start gap-x-1 gap-y-2 p-4">
                        <div className="w-full flex flex-col space-y-2">

                          <div className="w-full flex flex-col md:flex-row justify-start md:items-center">
                            <div className="flex w-16">Plan:</div>
                            <div className="w-full bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md text-accentColor text-xl font-medium text-start">
                              <span>{selectedPlan.key}</span>
                            </div>
                          </div>
                          <div className="w-full flex flex-col md:flex-row justify-start ">
                            <div className="flex w-16 mt-1">From:</div>
                            <div className="w-full bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md break-all text-start">
                              <span>{clientId}</span>
                            </div>
                          </div>
                          <div className="w-full flex flex-col md:flex-row justify-start">
                            <div className="flex w-16 mt-1">To:</div>
                            <div className="w-full bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md break-all text-start">
                              <span>{accountId}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-2 flex justify-end">
                      <div className="w-fit flex flex-col items-baseline tracking-tight border-borderShade/10 bg-accentColor/10 border px-2 py-1 rounded-lg">
                        <div className="w-full flex items-end">

                          <p className="text-2xl font-medium text-accentColor">
                            {convertUsdToIcp(selectedPlan.price).icp.toFixed(2)}
                          </p>
                          <span className="ml-1 font-thin">ICP</span>
                          <span className="text-accentColor3 ml-2 text-xs font-light leading-loose">From USD</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-8 md:mt-20 text-xs leading-5 text-fontPrimaryColor/60 text-pretty">
                      This Payment automatically deducts the amount from your wallet
                    </p>
                    <div className="mt-4">
                      <button onClick={paymentConfirmation}
                        className="px-4 py-2 bg-accentColor hover:accent-current text-white rounded-md w-full">
                        Pay Now
                      </button>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PricingPage;
