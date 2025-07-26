import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/sectionHomePage/Hero";
import Feature from "../components/layout/sectionHomePage/Feature";
import Advantages from "../components/layout/sectionHomePage/Advantages";
import Gallery from "../components/layout/sectionHomePage/Gallery";
import About from "../components/layout/sectionHomePage/About";
import Footer from "../components/layout/sectionHomePage/Footer";
import { useAuth } from "../provider/authProvider";
const HomePage = () => {
  const { loading, credit, principalId, isLoggedIn, Login, Logout, tier } = useAuth();
  
  return (
    <>
      <div className="font-Poppins flex h-full w-full flex-col justify-center gap-y-40">
        <Navbar navbarStyle="primary" principalId={principalId} isLoggedIn={isLoggedIn} credit={credit} Login={Login} Logout={Logout} loading={loading} tier={tier} />
        <Hero />
        <Feature Login={Login} isLoggedIn={isLoggedIn}/>
        <Advantages />
        <Gallery />
        <About Login={Login} isLoggedIn={isLoggedIn}/>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;