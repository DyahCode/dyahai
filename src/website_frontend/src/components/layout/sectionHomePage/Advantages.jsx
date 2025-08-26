import React from "react";
import { motion } from "framer-motion";
import ContainerBox, { Box, Container } from "../Container";
import HeadSection from "../HeadSection";

// import Web3Image from "../../../assets/images/advantages/web-3.0.png";
// import dAppImage from "../../../assets/images/advantages/d-app.png";
// import SmartContractImage from "../../../assets/images/advantages/smart-contract.png";
const Web3iImage = "https://bafybeidis4yoohxc7qbc7l7tbqmkoqnbaukrdv7uknxguqrx6b6y4yppti.ipfs.w3s.link/web-3.0.png"
const dAppImage = "https://bafybeigjedzgypcqbfoc5kfhh3k6dktvhuex5ssotqtvpzponyyygjhjye.ipfs.w3s.link/d-app.png"
const SmartContractImage = "https://bafybeih75nevush7jfjmri6hh76x4m6cdx5xtcvlanr2qqfj2j6iuzqq5u.ipfs.w3s.link/smart-contract.png"


const Advantages = () => {
  return (
    <>
      {/* head section */}
      <HeadSection>
        <span className="text-4xl font-bold md:text-7xl text-fontPrimaryColor">
          Why you should choose DyahAI ?
        </span>
      </HeadSection>

      {/* body section */}
      <section
        id="advantages"
        className="scroll-mt-[700px]">
        {/* <div className="container bg-primaryColor z-10 flex flex-col items-center justify-center mt-[30vh] mb-[20vh] md:mt-[50vh] md:mb-[30vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { type: "Spring", bounce: 0.8 },
            }}
            viewport={{ once: true, amount: 0.8 }}
            className="text-center flex flex-col space-y-10"
          >
            <span className="text-4xl font-bold md:text-7xl text-fontPrimaryColor">
              Why you should choose DyahAI ?
            </span>
          </motion.div>
        </div> */}

        <div className="text-fontPrimaryColor flex w-full flex-col items-center justify-center gap-x-4 gap-y-20 rounded-lg">
          <div className="flex w-full flex-col items-center justify-center gap-y-10 text-center">
            <ContainerBox boxClass="space-y-20">

              {/* <div className="border-borderShade rounded-lg border border-opacity-30 py-10"> */}
              <div className="flex flex-col items-center justify-center md:gap-y-10">
                <div className="relative flex h-full w-full flex-col">
                  <div
                    className="border-borderShade absolute inset-0 z-0 h-full w-full"
                    style={{
                      background:
                        "linear-gradient(to top, #08baa5 -50%, transparent 75%)",
                    }}
                  />
                  <img src={Web3iImage} alt="" className="z-10" />
                </div>
                <div className="space-y-10 md:px-10">
                  <h1 className="text-fontPrimaryColor/95 text-2xl font-bold md:text-5xl">
                    Implementation of Web 3.0
                  </h1>
                  <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
                    DyahAI is built with the latest in Web 3.0 technology, the
                    Internet Computer Protocol (ICP), enabling the application
                    to operate fully on the blockchain without reliance on
                    traditional servers. ICP allows DyahAI to process requests
                    quickly and efficiently, providing a more stable and
                    responsive experience for users. This Web3 technology
                    ensures that the application can run independently on an
                    open and decentralized network, free from any central
                    authority. By utilizing ICP, DyahAI offers enhanced
                    security, higher availability, and a resilient,
                    future-proof solution, making it the ideal choice for
                    users seeking ease of use, innovation, and robust
                    technology.
                  </p>
                </div>
              </div>
              {/* </div> */}
            </ContainerBox>


            <Container className="flex flex-col md:flex-row justify-center gap-x-10 space-y-10 md:space-y-0 mx-auto">

              {/* <div className="container flex w-full flex-col justify-center gap-x-10 gap-y-20 md:mx-auto md:flex-row md:gap-y-10"> */}

              <Box className="w-full md:w-1/2 space-y-10">
                {/* <div className="border-borderShade flex w-full flex-col justify-start gap-y-5 rounded-lg border border-opacity-30 px-4 py-10 text-center md:w-1/2 md:px-10"> */}
                <div className="flex w-full justify-center">
                  <img src={SmartContractImage} alt="" className="w-10/12" />
                </div>
                <h1 className="text-fontPrimaryColor/95 text-2xl font-bold md:text-5xl">
                  Smart Contract Technology
                </h1>
                <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
                  At DyahAI, we leverage smart contract technology to provide a
                  secure and transparent experience for our users. Smart
                  contracts are digital agreements that automatically execute
                  when specific conditions are met, allowing transactions and
                  interactions to happen without intermediaries or centralized
                  authorities. This not only reduces transaction costs but also
                  minimizes the risk of data manipulation or information
                  breaches. Every interaction—whether transforming an image into
                  a cartoon or using other features—is automatically and
                  permanently recorded on the blockchain, ensuring the validity
                  and security of the entire process. With this technology, you
                  have full control over your data and creations without any
                  concerns.
                </p>
                {/* </div> */}
              </Box>

              <Box className="w-full md:w-1/2 space-y-10">

                {/* <div className="border-borderShade flex w-full flex-col justify-start gap-y-5 rounded-lg border border-opacity-30 px-4 py-10 text-center md:w-1/2 md:px-10"> */}
                <div className="flex w-full justify-center">
                  <img src={dAppImage} alt="" className="w-10/12" />
                </div>
                <div>
                  <h1 className="text-fontPrimaryColor/95 text-2xl font-bold md:text-5xl">
                    D-App
                  </h1>
                  <h1 className="text-fontPrimaryColor/95 text-2xl font-bold md:text-5xl">
                    Global Service
                  </h1>
                </div>
                <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
                  DyahAI provides a fully decentralized blockchain-based
                  service, making it a global platform accessible to anyone,
                  anywhere. With an infrastructure that doesn’t rely on
                  centralized data centers, DyahAI offers a truly autonomous and
                  open application for users across the world. You can enjoy the
                  experience of transforming your images into cartoon-style
                  artwork with the assurance that your data is secure, private,
                  and always accessible whenever you need it. This platform is
                  designed to protect user privacy and uphold data independence
                  without geographical limits, providing a sense of security and
                  ease of use in every interaction.
                </p>
                {/* </div> */}
              </Box>

              {/* </div> */}
            </Container>

          </div>
        </div>
      </section >
    </>
  );
};

export default Advantages;
