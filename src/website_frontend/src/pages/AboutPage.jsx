import React from "react";
import { Container } from "../components/layout/Container";

import Navbar from "../components/layout/Navbar";
import About from "../components/layout/sectionHomePage/About";
import GettingStarted from "../components/layout/sectionHomePage/GettingStarted";
import TeamProfile from "../components/layout/sectionAboutPage/teamProfile";
import AboutMission from "../components/layout/sectionAboutPage/aboutMission";
import AboutTeamBase from "../components/layout/sectionAboutPage/aboutTeamBase";
import Footer from "../components/layout/Footer";

const AboutPage = () => {
  return (
    <>
      <div className="flex h-full flex-col items-center overflow-hidden">
        <Navbar navbarStyle="secondary" />
        <About />

        <Container>
          <div className="w-full flex flex-col items-center text-center text-fontPrimaryColor/80">
            <span className="text-fontPrimaryColor/80 text-center md:text-xl text-base leading-relaxed">
              DyahAI is a Web3-powered generative AI platform developed by the DyahCode Team.
              We provide an innovative solution for creating digital art that is accessible, affordable, and high-quality.
              DyahAI makes image generation simple without need design skills, expensive tools, or complex processes required.
            </span>
          </div>
        </Container>

        <AboutMission />
        <AboutTeamBase />

        <TeamProfile />

        <GettingStarted />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;