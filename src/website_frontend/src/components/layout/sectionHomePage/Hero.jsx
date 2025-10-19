import React from "react";
import { ScrollParallax } from "react-just-parallax";

import { useAuth } from "../../../provider/authProvider";
import { useNavigate } from "react-router-dom";
import { usePopup } from "../../../provider/PopupProvider";

import Button from "../../ui/Button";
import EcosystemSupport from "./EcosystemSupport";


const BgHeroImage = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/background-hero.webp";
const HeroImage = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/hero.webp";

const PickStyle = [
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/hero-pick-styles-1.webp",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/hero-pick-styles-2.webp",
  "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/hero-pick-styles-3.webp",
]

const Hero = () => {
  const navigate = useNavigate();
  const { Login, isLoggedIn } = useAuth();
  const { showPopup, hidePopup } = usePopup();

  const handleNavigationGenerate = () => {
    if (isLoggedIn) {
      navigate("/generate");
    } else {
      showPopup({
        title: "Login Required",
        message: "To use this feature, please log in first. Once you are logged in, you can connect and continue using this feature.",
        type: "warning",
        leftLabel: "Login",
        onLeft: () => { Login() },
        rightLabel: "Cancel",
        onRight: () => { hidePopup() },
      });
    }
  };

  return (
    <>
      <main className="pt-[10rem] md:pt-[12rem] w-full flex flex-col items-center justify-center gap-y-20 md:h-full md:gap-y-0 relative">
        <div className="container relative"
        >
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
            <h1 className="h1 mb-6 text-n-1">
              <span className="block relative bg-linear-gradient bg-clip-text text-transparent">A Fast Blockchain.</span>
              Scalable AI.
            </h1>
            <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
              Unleash the power of generative AI within your visuals, journeying into a realm of boundless imagination.
            </p>
            <div className="flex gap-x-4 justify-center">
              <Button type="primary" onClick={handleNavigationGenerate}>
                Get Started
              </Button>
              <Button type="secondary" onClick={() => { navigate("/about") }}>
                Ecosystems
              </Button>
            </div>
          </div>
          <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
            <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
              <div className="relative bg-n-8 rounded-[1rem]">
                <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

                <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                  <img
                    src={HeroImage}
                    className="w-full scale-[1.25] -translate-y-[6%] md:scale-[1] md:-translate-y-[28%] lg:scale-[0.85] lg:-translate-y-[31.5%]"
                    width={1024}
                    height={490}
                    alt="AI"
                  />

                  <ScrollParallax isAbsolutelyPositioned>
                    <div className="hidden md:flex absolute md:-left-[1.5rem] lg:-left-[3rem] xl:-left-[5.5rem] bottom-[12rem] px-2 py-2 bg-n-3/10 backdrop-blur border border-n-1/10 space-x-2 rounded-2xl">
                      <div className="p-1 bg-n-3/10 rounded-xl">
                        <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/hero/uploaded-images.webp" width={60} alt="User Image Upload" className="rounded-lg" />
                      </div>
                      <div className="w-fit min-w-[12rem] border border-n-1/10 bg-n-3/10 rounded-xl px-2 py-1 flex flex-col">
                        <span className="body-2 text-n-1/90">Uploaded Images</span>
                        <span className="text-xs text-n-1/50 tracking-wider">JPG / JPEG / PNG</span>
                      </div>
                    </div>
                  </ScrollParallax>

                  <ScrollParallax isAbsolutelyPositioned>
                    <div className="hidden absolute md:-right-[1.5rem] lg:-right-[3rem] xl:-right-[5.5rem]  bottom-[9rem] px-2 py-2 bg-n-3/10 backdrop-blur border border-n-1/10 rounded-2xl md:flex flex-col">
                      <div className="w-full flex space-x-2">
                        {PickStyle.map((url, index) => (
                          <div
                            key={index}
                            className={`rounded-xl transition-all duration-300 border relative
                          ${index === 1 ? "bg-accentColor/10 border-accentColor/40" : "bg-n-3/5 border-transparent"} `} >

                            {index === 1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="absolute z-1 size-5 fill-accentColor right-1">
                              <path d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.523-3.308a.75.75 0 0 0-1.048.169l-3.597 4.981a.25.25 0 0 1-.391.018l-1.506-1.72a.75.75 0 1 0-1.129.987l1.506 1.721a1.75 1.75 0 0 0 2.736-.128l3.597-4.98a.75.75 0 0 0-.168-1.048" />
                            </svg>}

                            <img src={url} width={64} alt={`Pick Style ${index}`} className="p-1 rounded-xl" />
                          </div>

                        ))}
                      </div>
                      <div className="w-full flex mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5 fill-accentColor right-1">
                          <path d="M18.577 6.183a1 1 0 0 1 .24 1.394l-5.666 8.02c-.36.508-.665.94-.94 1.269c-.287.34-.61.658-1.038.86a2.83 2.83 0 0 1-2.03.153c-.456-.137-.82-.406-1.149-.702c-.315-.285-.672-.668-1.09-1.116l-1.635-1.753a1 1 0 1 1 1.462-1.364l1.606 1.722c.455.487.754.806.998 1.027c.24.216.344.259.385.271c.196.06.405.045.598-.046c.046-.022.149-.085.36-.338c.216-.257.473-.62.863-1.171l5.642-7.986a1 1 0 0 1 1.394-.24"></path>
                        </svg>
                        <span className="ml-2 text-left tagline">Style Choosed</span>
                      </div>
                    </div>
                  </ScrollParallax>
                </div>
              </div>

              <Gradient />
            </div>
            <div className="z-0 absolute -top-[4%] scale-[1.75] left-1/2 w-full -translate-x-1/2 md:scale-[1.41] md:-top-[46.5%] md:w-[100%] lg:scale-[1.21] lg:-top-[76.5%] ">
              <img
                src={BgHeroImage}
                className="w-full"
                width={1440}
                height={1800}
                alt="hero"
              />
            </div>
            <BackgroundCircles />
          </div>

          {/* ecosystem support logo */}
          <EcosystemSupport className="hidden relative z-10 mt-20 lg:block" />
        </div>
      </main >
    </>
  );
};

export default Hero;





const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem] -z-10">
      <Rings />

      {/* Moving background colored circle balls */}
      {/* <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}> */}
      <div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
          <div
            className={`w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
          <div
            className={`w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
          <div
            className={`hidden w-4 h-4 -ml-1 mt-[12.9rem] bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full xl:block transit transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
          <div
            className={`w-3 h-3 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]">
          <div
            className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[70deg]">
          <div
            className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
          />
        </div>
      </div>
      {/* </MouseParallax> */}
    </div>
  );
};

const Rings = () => {
  return (
    <>
      <div className="absolute -z-10 top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute -z-10 top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute -z-10 top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute -z-10 top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </>
  );
};


export const Gradient = () => {
  return (
    <>
      <div className="relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
      <div className="relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
    </>
  );
};

const PlusSvg = ({ className = "" }) => {
  return (
    <svg className={`${className} || ""`} width="11" height="11" fill="none">
      <path
        d="M7 1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8a1 1 0 0 1-1-1V1z"
        fill="#ada8c4"
      />
    </svg>
  );
};
