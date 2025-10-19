import React from "react";
import { motion } from "framer-motion";
import ContainerBox, { BackdropBox, Box, Container } from "../Container";
import HeadSection from "../HeadSection";
import Coins3D from "../../ui/Coin/Coins3D";

const IntroduceWeb3 =
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/background/introduce-web-3.webp";


const Advantages = () => {
  const advantagesRef = React.useRef(null);
  return (
    <>
      {/* head section */}
      <HeadSection headerName="advantages">
        <span className="h2 text-n-1">
          Why should you choose DyahAI ?
        </span>
        <span className="header-1 text-n-3/80">
          DyahAI brings a new innovation to the creative ecosystems, explore and enhance the value of their visual creations through intelligent image transformation.
        </span>
      </HeadSection>


      {/* body section */}
      <section id="advantages" className="scroll-mt-[700px]">
        <div className="flex w-full flex-col items-center justify-center text-center">

          {/* section web3.0 */}
          <ContainerBox boxClass="">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full h-0 flex-col select-none">
                <img src={IntroduceWeb3} width={1400} className="scale-[140%] py-16 top-0 opacity-90" alt="" />
              </div>
              <div className="z-10 py-12 px-20 pb-20">
                <span className="body-2 text-n-1/70">
                  welcome
                </span>
                <h2 className="h2 text-n-1 mt-[2.125em] mb-[4.675em] uppercase">
                  Web 3.0
                </h2>
                <span className="h5 text-n-3/90">
                  DyahAI runs on a resilient, serverless Web 3.0 backbone. Built for speed, security, and creative freedom. No limits, it just seamless image generation powered by decentralized technology.
                </span>
              </div>
              <div className="w-full flex gap-4 px-8 pb-10">
                <BackdropBox cursorHover className="w-1/3 p-4" g1 g1Style="-bottom-[100px] h-10 w-full">
                  <div className="w-full flex items-center space-x-2 mb-2">
                    <div className="size-14 p-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="size-full fill-none">
                        <g fillRule="evenodd">
                          <circle
                            cx="24"
                            cy="24"
                            r="23"
                            fillRule="nonzero"
                            className="fill-color-5 stroke-color-5 justify-center"
                          />
                          <g
                            transform="translate(4.5, 5) scale(1.25)"
                            className="fill-[#F4B400] stroke-[#F4B400] stroke-[0.8px]"
                          >
                            <path d="M6 9.714v4.076l9.895 5.715l6.42-3.715v3.315l3.456 2.038V9.714l-9.885 5.715z" />
                            <path d="M15.886 4L6 9.714v11.429l9.886 5.714l9.857-5.714l-3.495-2.038l-6.362 3.676l-6.39-3.676v-7.353l6.39-3.676l6.362 3.676l3.495-2.038z" className="opacity-60" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h6 className="h6 text-left">Smart Contract</h6>
                  </div>
                  <div className="w-full flex text-left">
                    <span className="body-2 ml-1 text-n-3/80 text-pretty">
                      Logic runs on-chain. No middlemen, just secure, self-executing code that builds trust.
                    </span>
                  </div>
                </BackdropBox>

                <BackdropBox cursorHover className="w-1/3 p-4" g1 g1Style="-bottom-[100px] h-10 w-full">
                  <div className="w-full flex items-center space-x-2 mb-2">
                    <div className="size-14 p-1">
                      <div className="bg-color-5 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <g fill="none">
                            <path className="fill-fontPrimaryColor" d="M8.826 15.612c.15-.209.292-.407.463-.6c-2.05.513-3.46 1.589-3.46 2.833q0 .07.006.14q.3-.12.638-.29c1.354-.692 1.884-1.431 2.353-2.083M10.96 17.9c.41-.57.763-1.063 1.764-1.573c1-.511 1.59-.502 2.275-.49c.46.007.953.015 1.557-.12c-.736-.411-1.944-.722-3.013-.888l-1.628 1.186l-.74-.722c-.772.54-1.167 1.09-1.526 1.588c-.41.57-.764 1.063-1.764 1.574c-.702.358-1.202.46-1.674.486c.373.514 1 .965 1.803 1.312q.282-.112.592-.271c1.354-.69 1.885-1.43 2.354-2.082m6.198-1.477c-.782-.013-1.669-.027-3.022.664c-1.354.692-1.884 1.431-2.353 2.083c-.41.57-.764 1.063-1.764 1.574l-.133.066a11.6 11.6 0 0 0 2.578.181c.25-.275.446-.546.63-.802c.41-.57.764-1.064 1.764-1.574s1.591-.501 2.275-.49c.315.005.648.01 1.02-.03q.02-.124.019-.249c0-.51-.238-.993-.66-1.42zm-2.684 4.313c1.617-.362 2.872-1.069 3.41-1.938c-.462.088-.988.257-1.614.577c-.873.446-1.404.912-1.796 1.36"></path>
                            <path fill="url(#SVG433rEdHJ)" d="m12 3l-6.943 7.2L12 16.886l6.943-6.686z"></path>
                            <path fill="url(#SVGIdwVlbIi)" d="M12 10.2H5.057L12 3z"></path>
                            <defs>
                              <linearGradient id="SVG433rEdHJ" x1={15.346} x2={7.139} y1={7.762} y2={13.96} gradientUnits="userSpaceOnUse">
                                <stop offset={0.09} stopColor="#ff6d41"></stop>
                                <stop offset={0.5} stopColor="#fa297f"></stop>
                                <stop offset={1} stopColor="#fa297f"></stop>
                              </linearGradient>
                              <linearGradient id="SVGIdwVlbIi" x1={13.561} x2={6.954} y1={4.951} y2={11.42} gradientUnits="userSpaceOnUse">
                                <stop stopColor="#652cb4"></stop>
                                <stop offset={0.07} stopColor="#652cb4" stopOpacity={0.82}></stop>
                                <stop offset={0.19} stopColor="#652cb4" stopOpacity={0.53}></stop>
                                <stop offset={0.3} stopColor="#652cb4" stopOpacity={0.3}></stop>
                                <stop offset={0.4} stopColor="#652cb4" stopOpacity={0.14}></stop>
                                <stop offset={0.49} stopColor="#652cb4" stopOpacity={0.04}></stop>
                                <stop offset={0.55} stopColor="#652cb4" stopOpacity={0}></stop>
                              </linearGradient>
                            </defs>
                          </g>
                        </svg>
                      </div>
                    </div>
                    <h6 className="h6 text-left">NTFs Minting</h6>
                  </div>
                  <div className="w-full flex text-left">
                    <span className="body-2 text-n-3/80 ml-1 text-pretty">
                      Your art that's your rules. Mint it, and own it. Let the blockchain prove it’s yours.
                    </span>
                  </div>
                </BackdropBox>

                <BackdropBox cursorHover className="w-1/3 p-4" g1 g1Style="-bottom-[100px] h-10 w-full">
                  <div className="w-full flex items-center space-x-2 mb-2">
                    <div className="size-14 p-1">
                      <div className="bg-color-5 rounded-full p-2">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="fill-[#C6FF00]">
                          <path fillRule="evenodd" d="M6.964 1.79a.75.75 0 0 1-.51.93A5.51 5.51 0 0 0 2.72 6.455a.75.75 0 0 1-1.44-.421A7.01 7.01 0 0 1 6.034 1.28a.75.75 0 0 1 .93.51m2.072 0a.75.75 0 0 1 .93-.51a7.003 7.003 0 0 1 4.176 10.08a.75.75 0 1 1-1.315-.72a5.503 5.503 0 0 0-3.281-7.92a.75.75 0 0 1-.51-.93M1.79 9.036a.75.75 0 0 1 .93.51a5.503 5.503 0 0 0 7.92 3.28a.75.75 0 1 1 .72 1.316A7.003 7.003 0 0 1 1.28 9.966a.75.75 0 0 1 .51-.93M8 5.5a2.5 2.5 0 0 0-1.153 4.719a.75.75 0 0 1-.694 1.33A4 4 0 1 1 12 8a.75.75 0 0 1-1.5 0A2.5 2.5 0 0 0 8 5.5m.742 2.392a.75.75 0 1 0-1.484.216c.252 1.726 1.493 3.001 3.18 3.14a.75.75 0 1 0 .123-1.495c-.918-.076-1.657-.751-1.819-1.861" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <h6 className="h6 text-left">Zero-Knowledge Proofs</h6>
                  </div>
                  <div className="w-full flex text-left">
                    <span className="body-3 text-n-3/80 ml-1 text-pretty">
                      Share nothing, prove everything. With Zero-Knowledge technology that keeps your data as yours.
                    </span>
                  </div>
                </BackdropBox>

              </div>
            </div>
          </ContainerBox>

          <Container className="mt-[6rem]">
            <BackdropBox className="gap-y-10" g1 g2 g2Style="-bottom-[200px] -right-[100px] w-full h-60">
              <div ref={advantagesRef} className="w-full flex flex-col py-20 px-10 space-y-10 relative">
                <div className="w-full flex">
                  <div className="w-[60%] h-fit flex items-center justify-center ">
                    <Coins3D
                      logo="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/generation-process-animation.gif"
                      containerRef={advantagesRef}
                    />
                  </div>
                  <div className="w-[40%] h-fit flex flex-col">
                    <h3 className="text-left h3 text-n-3">
                      DYA Tokenomics
                    </h3>
                    <div className="w-full flex flex-row items-center space-x-4 mt-2">
                      <span className="bg-accentColor/10 px-3 py-0.5 border border-accentColor/40 rounded-full text-xs text-n-2">
                        Buy
                      </span>
                      <div className="w-1 h-1 bg-n-1/80 rounded-full" />
                      <span className="bg-accentColor/10 px-3 py-0.5 border border-accentColor/40 rounded-full text-xs text-n-2">
                        Trade
                      </span>
                      <div className="w-1 h-1 bg-n-1/80 rounded-full" />
                      <span className="bg-accentColor/10 px-3 py-0.5 border border-accentColor/40 rounded-full text-xs text-n-2">
                        Burn
                      </span>
                    </div>
                    <span className="mt-6 text-left body-2 text-n-3">
                      As the core of transactions within DyahAI, DYA Token powers every creative interaction — from image generation to premium access. We’re building a future-ready token that supports utility, scalability, and community growth.
                    </span>

                    <div>
                      <div className="mt-8 bg-fontPrimaryColor/5 px-2.5 py-4 border border-fontPrimaryColor/10 rounded-lg flex items-center">
                        {/* coin Logo */}
                        <div className="w-fit bg-fontPrimaryColor/10 p-1 border border-fontPrimaryColor/15 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-8 fill-amber-400">
                            <path d="M12 21.934A9.934 9.934 0 1 1 21.934 12A9.945 9.945 0 0 1 12 21.934m0-18.868A8.934 8.934 0 1 0 20.934 12A8.944 8.944 0 0 0 12 3.066" />
                            <path className="fill-white" d="M14.28 11.78a1.994 1.994 0 0 0-1.53-3.28h-.25V7.47A.49.49 0 0 0 12 7a.483.483 0 0 0-.5.47V8.5h-1.25a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.25v1.03a.483.483 0 0 0 .5.47a.49.49 0 0 0 .5-.47V15.5h.75a2.006 2.006 0 0 0 2-2a2.03 2.03 0 0 0-.97-1.72M10.25 9.5h2.5a1 1 0 0 1 0 2h-2.5Zm3 5h-3v-2h3a1 1 0 0 1 0 2" />
                          </svg>
                        </div>
                        <div className="flex w-full items-center">

                          <span className="ml-2">DYA</span>
                          <span className="ml-2 text-white/50 text-xs">/ DyahAI</span>
                        </div>

                        <div className="fill-accentColor/80 h-6 w-full">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-white/80 size-full">
                            <path d="M12.005 22.003c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10m0-13h-4v2h9l-5-5zm-5 4l5 5v-3h4v-2z" />
                          </svg>
                        </div>

                        <span className="ml-2 body-1 text-accentColor/90">0.0187</span>
                        <span className="ml-1 text-xs">ICP</span>

                      </div>
                    </div>
                  </div>
                </div>

                {/* statistic */}
                <div className="w-full flex space-x-4">
                  {/* supply */}
                  <div className="w-1/2 lg:w-1/4 bg-fontPrimaryColor/5 px-2 py-6 rounded-lg">
                    <h5 className="h5 lining-nums">{">"}100B</h5>
                    <span className="body-2 text-n-3">supply Distribution</span>
                  </div>

                  {/* Blocks */}
                  <div className="w-1/2 lg:w-1/4 bg-fontPrimaryColor/5 px-2 py-6 rounded-lg">
                    <h5 className="h5 lining-nums">50+</h5>
                    <span className="body-2 text-n-3">Total Blocks</span>
                  </div>

                  {/* Burn Cycles */}
                  <div className="w-1/2 lg:w-1/4 bg-fontPrimaryColor/5 px-2 py-6 rounded-lg">
                    <h5 className="h5">+70K</h5>
                    <span className="body-2 text-n-3">Burn Cycles</span>
                  </div>

                  {/* Burn Cycles */}
                  <div className="w-1/2 lg:w-1/4 bg-fontPrimaryColor/5 px-2 py-6 rounded-lg">
                    <h5 className="h5">null</h5>
                    <span className="body-2 text-n-3">null</span>
                  </div>
                </div>
              </div>
            </BackdropBox>
          </Container>
        </div >
      </section >
    </>
  );
};

export default Advantages;
