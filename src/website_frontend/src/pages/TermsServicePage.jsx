import React from "react";
import { useAuth } from "../provider/authProvider";
import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/sectionHomePage/Footer";

const termsData = [
  {
    title: "1. Service",
    content: [
      "Dyah AI is an image generator service powered by artificial intelligence and Web3 technology that creates images based on user input.",
      "This service can be accessed through our website and requires an internet connection.",
    ],
  },
  {
    title: "2. Access and Accounts",
    content: [
      "Users must create an account to access certain features.",
      "Users are responsible for securing their account credentials.",
      "Dyah AI reserves the right to suspend or delete accounts that violate usage policies.",
    ],
  },
  {
    title: "3. Ownership and Copyright",
    content: [
      "Images generated using Dyah AI may be used by users for personal or commercial purposes, unless stated otherwise.",
      "Dyah AI does not claim ownership over user-created images, but retains the right to use them for development and promotional purposes unless the user objects in writing.",
    ],
  },
  {
    title: "4. Payment and Subscription",
    content: [
      "Dyah AI offers both free and paid plans.",
      "All transactions are transparent and recorded on a Web3-based system for security and accountability.",
    ],
  },
  {
    title: "5. Usage Restrictions",
    content: [
      "Users are prohibited from using Dyah AI to generate content that is illegal, discriminatory, or pornographic.",
      "Users may not extract source code, reverse engineer, or perform similar activities.",
      "Users may not disrupt Web3 systems or our security infrastructure.",
    ],
  },
  {
    title: "6. Privacy",
    content: [
      "We respect user privacy. Personal data is collected and stored in accordance with our privacy policy.",
      "No data is shared without user consent.",
    ],
  },
  {
    title: "7. Disclaimer and Limitation of Liability",
    content: [
      "Dyah AI does not guarantee that the service will always be error-free or uninterrupted.",
      "Dyah AI is not liable for any loss resulting from the use of the service, whether direct or indirect.",
    ],
  },
  {
    title: "8. Changes to Terms",
    content: [
      "Dyah AI reserves the right to update these terms at any time.",
      "Changes will be announced on our website.",
    ],
  },
  {
    title: "9. Governing Law",
    content: [
      "These terms and conditions are governed by the laws of the Republic of Indonesia.",
    ],
  },
];




const TermsServicePage = () => {
  const { credit, principalId, isLoggedIn, Login, Logout, tier } = useAuth();

  return (
    <div className="bg-primaryColor min-h-screen w-full flex flex-col justify-center">
      <Navbar
        navbarStyle="secondary"
        principalId={principalId}
        isLoggedIn={isLoggedIn}
        credit={credit}
        Login={Login}
        Logout={Logout}
        tier={tier}
      />
      <section className="pt-[8dvh] relative w-full h-full flex flex-col items-center">

        {/* Box */}
        <div className="container py-20">
          <div className="flex flex-col rounded-2xl items-center justify-center transition duration-200 border border-t-2 border-t-neutral-500/25 border-neutral-500/10 hover:border-neutral-500/25 bg-gradient-to-b from-white/[0.025] via-white/[0.015] to-white/[0.01] backdrop-blur-2xl p-2 md:p-10 group text-fontPrimaryColor mb-[435px]">
            <div className="w-full flex flex-col gap-2 items-center md:w-[70%]">
              <span className="text-4xl font-bold">
                Terms of Service – Dyah AI
              </span>
              <p className="text-sm text-gray-300 mb-4">
                Last updated: July 18, 2025
              </p>
              <p className="mb-4 text-base text-center">
                Welcome to Dyah AI. By accessing and using our services on the
                Dyah AI platform, you agree to the following terms and
                conditions. Please read carefully before using our services.
              </p>
            </div>

            {termsData.map((section, idx) => (
              <div key={idx} className="w-full flex flex-col md:w-[70%]">
                <span className="text-xl font-semibold py-2">
                  {section.title}
                </span>
                <div className="pl-6">
                  <ul className="text-fontPrimaryColor/70 ml-4">
                    {section.content.map((item, subIdx) => (
                      <li
                        className="list-outside list-disc pb-1 text-base"
                        key={subIdx}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full h-0 border-[0.75px] border-borderShade/40 mt-4 mb-6"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermsServicePage;
