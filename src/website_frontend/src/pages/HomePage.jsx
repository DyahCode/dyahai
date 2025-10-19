import React from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/sectionHomePage/Hero";
import Feature from "../components/layout/sectionHomePage/Feature";
import Advantages from "../components/layout/sectionHomePage/Advantages";
import Collections from "../components/layout/sectionHomePage/Collections";
import About from "../components/layout/sectionHomePage/About";
import GettingStarted from "../components/layout/sectionHomePage/GettingStarted";
import Footer from "../components/layout/Footer";

const HomePage = () => {
  return (
    <>
      <div className="flex h-full flex-col items-center overflow-hidden">
        <Navbar navbarStyle="primary" />
        <Hero />
        <Feature />
        <Advantages />
        <Collections />
        <About showReviews />
        <GettingStarted />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;