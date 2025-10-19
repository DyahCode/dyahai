import React from "react";
import { useAuth } from "../provider/authProvider";
import Navbar from "../components/layout/Navbar.jsx";
import GettingStarted from "../components/layout/sectionHomePage/GettingStarted";
import ContainerBox, { Box, Container } from "../components/layout/Container";
import Footer from "../components/layout/Footer";

const termsData = [
  {
    title: "1. Agreement to Terms",
    content: [
      "These Terms of Service (“Terms”) constitute a legally binding agreement between you, whether individually or on behalf of an entity (“you”), and DyahAI (“Company,” “we,” “us,” or “our”), regarding your access to and use of the DyahAI platform, including but not limited to our website, web application, mobile application, API, or any other official technology provided by DyahAI (collectively, the “Platform”).",
      "DyahAI provides AI-powered services for generating digital content, including images, and integrates Web3 technology for payment processing, identity verification, and secure interactions (the “Services”). By accessing or using the Platform and/or Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
      "IF YOU DO NOT AGREE WITH ALL OF THESE TERMS, YOU ARE EXPRESSLY PROHIBITED FROM USING THE PLATFORM OR SERVICES, AND YOU MUST IMMEDIATELY DISCONTINUE USE.",
      "Supplemental terms, policies, or agreements that may be posted on the Platform from time to time are expressly incorporated into these Terms by reference. We reserve the right, in our sole discretion, to update or modify these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the Platform, with the “Last Updated” date revised accordingly. By continuing to use the Platform after such updates, you agree to the revised Terms.",
      "The Platform and Services are not intended for distribution or use in any jurisdiction or country where such distribution or use would violate laws, regulations, or subject DyahAI to additional compliance obligations. Users who choose to access the Platform from other locations are solely responsible for ensuring compliance with applicable local laws.",
      "The Platform is not designed to comply with industry-specific regulations (such as HIPAA, FISMA, or other specialized compliance frameworks). If your use of the Services would require compliance with such regulations, you may not use the Platform. Additionally, you may not use the Platform in any manner that would cause us to violate applicable laws such as the Gramm-Leach-Bliley Act (GLBA) or similar regulations.",
      "The Platform is intended for individuals who are at least 18 years of age or the legal age of majority in their jurisdiction. Persons under 18 years old are strictly prohibited from creating accounts, accessing, or using the Services."
    ],
  },
  {
    title: "2. Service",
    content: [
      "DyahAI is an artificial intelligence (AI)-powered service designed to automatically generate digital images, with integrated Web3 technology as part of its payment and authentication system. The service is accessible only through official platforms provided by DyahAI.",
      "To use the service, users must have a stable internet connection and a compatible device. DyahAI is not responsible for service interruptions caused by network issues, device incompatibility, or other external factors beyond our control.",
      "As technology evolves, DyahAI may introduce new features, modify existing ones, or discontinue certain functionalities at any time to improve service quality and user experience. Any significant changes will be communicated through our official platform."
    ],
  },
  {
    title: "3. Eligibility & Accounts",
    content: [
      "DyahAI is intended only for individuals who are at least 18 years old or the legal age of majority in their jurisdiction of residence.",
      "When creating an account, you must provide accurate, complete, and up-to-date information. You are solely responsible for maintaining the confidentiality of your login credentials and for any activity conducted under your account.",
      "If an account is found to be fraudulent, inactive for an extended period, or in violation of these terms, DyahAI reserves the right to restrict, suspend, or permanently terminate the account without prior notice."
    ],
  },
  {
    title: "4. Ownership and Copyright",
    content: [
      "Users retain full ownership of the images they generate using DyahAI, unless otherwise required by law or governed by a separate agreement.",
      "By using the service, you grant DyahAI a non-exclusive license to use, reproduce, or display generated content for research, product development, service improvement, or promotional purposes. However, users may request an exception to this license by submitting a formal written request.",
      "You are solely responsible for ensuring that your generated content does not infringe on third-party rights, including copyrights, trademarks, privacy rights, or any other applicable intellectual property rights."
    ],
  },
  {
    title: "5. Payment, Subscription, and Refunds",
    content: [
      "DyahAI offers both free and paid subscription plans with varying features and credits. Pricing information and subscription benefits are transparently displayed on the official DyahAI platform.",
      "All payments are processed securely via Web3 systems and/or authorized third-party payment providers. Users are solely responsible for any transaction or gas fees associated with payments.",
      "Once a transaction is successfully completed, it cannot be unilaterally canceled by the user.",
      "Paid subscriptions may automatically renew at the end of each billing cycle unless canceled by the user before the next renewal date.",
      "Unless required by applicable law, all purchases are considered final and are non-refundable."
    ],
  },
  {
    title: "6. User Responsibilities and Restrictions",
    content: [
      "You agree not to use DyahAI to create, distribute, or promote content that is illegal, harmful, discriminatory, pornographic, defamatory, or otherwise offensive to individuals or groups.",
      "You may not attempt to hack, reverse engineer, abuse APIs, or gain unauthorized access to DyahAI’s systems. Such activities are strictly prohibited and may result in account suspension, termination, or legal consequences.",
      "You agree to use DyahAI in a responsible manner that does not harm other users, compromise system integrity, or violate any applicable laws and regulations."
    ],
  },
  {
    title: "7. Privacy and Data",
    content: [
      "DyahAI collects and processes user data in accordance with our Privacy Policy. We are committed to safeguarding the security and confidentiality of your personal data.",
      "We do not sell, rent, or share your personal data with third parties without your consent, unless required by law.",
      "You are solely responsible for securing your blockchain wallet, private keys, and any credentials associated with transactions on the platform."
    ],
  },
  {
    title: "8. User-Generated Content",
    content: [
      "All content generated or uploaded by users through DyahAI remains the sole responsibility of the user who created or uploaded it.",
      "DyahAI reserves the right to review, restrict, or remove any content that violates these terms, infringes upon third-party rights, or breaches our community guidelines."
    ],
  },
  {
    title: "9. Disclaimer of Warranties",
    content: [
      "DyahAI is provided on an 'as is' and 'as available' basis, without warranties of any kind, whether express or implied.",
      "We do not warrant that the service will always be uninterrupted, error-free, virus-free, or fully secure. The quality of generated images may also vary depending on the user’s inputs.",
      "We make no guarantees on the commercial viability or fitness of generated content for specific purposes.",
      "Your use of DyahAI is at your sole risk. DyahAI disclaims all liability for damages, whether direct or indirect, that may arise from your use of the service."
    ],
  },
  {
    title: "10. Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, DyahAI shall not be held liable for any incidental, indirect, special, or consequential damages, including but not limited to data loss, loss of profits, or business disruptions, resulting from the use of the service.",
      "If DyahAI is found to be legally liable under specific circumstances, the total maximum liability shall not exceed the amount you paid for the service in the thirty (30) days immediately preceding the claim."
    ],
  },
  {
    title: "11. Modifications to Terms",
    content: [
      "DyahAI reserves the right to update or amend these Terms of Service at any time. Changes will take effect upon being posted on our official website.",
      "By continuing to use DyahAI after any changes are posted, you agree to be bound by the revised Terms of Service."
    ],
  },
  {
    title: "12. Governing Law and Dispute Resolution",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of the Republic of Indonesia.",
      "Any disputes arising from or in connection with the use of DyahAI shall first be resolved through amicable negotiations. If no resolution is reached, the dispute shall be referred to binding arbitration conducted in Jakarta, Indonesia under applicable Indonesian law."
    ],
  },
];





const TermsServicePage = () => {
  const { credit, principalId, isLoggedIn, Login, Logout, tier } = useAuth();

  return (
    <div className="bg-primaryColor min-h-screen w-full flex flex-col justify-center">
      <Navbar
        navbarStyle="secondary" />
      <section className="relative w-full h-full flex flex-col items-center">

        {/* Box */}
        <Container className="pt-40">

          <Box className="flex flex-col text-fontPrimaryColor items-center justify-center">

            {/* <div className=""> */}
            <div className="w-full flex flex-col gap-2 text-center items-center lg:w-[70%]">
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
                <ul className="text-fontPrimaryColor/70 space-y-6 flex flex-col">
                  {section.content.map((item, subIdx) => (
                    <span
                      className="pb-1 text-base leading-loose hyphens-auto"
                      key={subIdx}
                    >
                      {item}
                    </span>
                  ))}
                </ul>
                <div className="w-full h-0 border-[0.75px] border-borderShade/40 mt-4 mb-6"></div>
              </div>
            ))}
            {/* </div> */}
          </Box>

          {/* </div> */}
        </Container>

      </section>
      <GettingStarted />
      <Footer />
    </div>
  );
};

export default TermsServicePage;
