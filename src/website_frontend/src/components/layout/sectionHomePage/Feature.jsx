import { React, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import BeforeAfterSlider from "../../ui/HDResult/slider";
import FTUImages from "../../ui/FreeToUse/FTUImages";
import { useAuth } from "../../../provider/authProvider";
import ContainerBox, { Box, Container } from "../Container";
import { usePopup } from "../../../provider/PopupProvider";

const AiImage1 =
  "https://bafkreicqclc24yrtmjkrjo5bkhrnu2gfaehmmiy46hnzn4fvpzpsep5sze.ipfs.w3s.link/?filename=AI-image-1.png";
// const AiImage1 =
//   "https://bafybeihviddhik4llwiuvakpaqeduextfm6l2qrsncroyqsbin6veto2we.ipfs.w3s.link/AI-image-1.png"; //error
const AiImage2 =
  "https://bafybeibkm4j4wtwsgh2devwchtrxvuhrwyoagm5223b4mqtyl55maejkuq.ipfs.w3s.link/AI-image-2.png";
const AiImage3 =
  "https://bafybeiexyfzpp3wfjxirmvfynxujiakoa3sz5t2vl3mrdqypkvr4u3agqi.ipfs.w3s.link/AI-image-3.png";
const AiImage4 =
  "https://bafkreibrisihlu5sefwr5yqqiwsb3fla5lk4w3scpp4rm2jckgftjkzjx4.ipfs.w3s.link/?filename=AI-image-4.png";
// const AiImage4 =
//   "https://bafybeicakq52sj5ne6bwtmotfmoega2gh3raqhyg3lwzk6475qu32hrkiq.ipfs.w3s.link/AI-image-4.png"; //error
const AiImage5 =
  "https://bafybeihsbbnqzyflfy3gckrj2vr7xsqram56l2o4j5xbst3zjl46c2ysmm.ipfs.w3s.link/AI-image-5.png";

const ImageAstronout =
  "https://bafybeib7eoqznxsg4dpzjvsv25u2b4dsn7uemr7mfpbvfawi3ut2ydv3g4.ipfs.w3s.link/astronout.png";
const ImageBaroque =
  "https://bafybeib56vwpymqe6zrdtq2htk5jvnycjkm7y7fgpc6c6q2tcefcsrbcfu.ipfs.w3s.link/baroque.png";
const ImageCyberpunk =
  "https://bafybeifgrdxz2tjmg2thbnstkbnwpp4baxpmtfq2zxnxzmzbn3mvu4jtfa.ipfs.w3s.link/cyberpunk.png";
const ImageFormal =
  "https://bafybeididesgtyzutdwuqcwixgso444q6r33q5w7qdr55mboaiho4tehwy.ipfs.w3s.link/formal.png";
const ImageJoker =
  "https://bafybeiasrj5bkd754nhlwaxypkm23ftoltkpqyozeymrmrlfr6abi542wq.ipfs.w3s.link/joker.png";
// const ImageOilPainting =
//   "https://bafybeieisbzgxd5yset3duucheemslv243deeszanadozc7o3gwwwe5gz4.ipfs.w3s.link/oil-painting.png"; //error
const ImageOilPainting =
  "https://bafybeibliftdx3q4qtagi3n6mpf63vpazydfpf24sze4wgzsowyurr7dau.ipfs.w3s.link";
const ImageShrek =
  "https://bafybeiemhgtr44b7h7z5ez33g3tlmmpqhzf6nj2mg246vzb427xbu7yoyq.ipfs.w3s.link/shrek.png";
const ImageZombie =
  "https://bafybeif36hbrahuczmxqxlwvi3fcd7obb2qyf5eewyew4yco4dza4pzp3a.ipfs.w3s.link/zombie.png";

const Feature = () => {
  const navigate = useNavigate();
  const { isLoggedIn, Login } = useAuth();
  const { showPopup, hidePopup } = usePopup();
  const { scrollY } = useScroll();

  const handleNavigationGenerate = () => {
    if (isLoggedIn) {
      navigate("/generate");
    } else {
      showPopup({
        title: "Plug Wallet Login Required",
        message: "To use this feature, please log in to your Plug Wallet first. Once you are logged in, you can connect and continue using this feature.",
        type: "warning",
        leftLabel: "Login",
        onLeft: () => { Login() },
        rightLabel: "Cancel",
        onRight: () => { hidePopup() },
      });
    }
  };

  const StyleArts = [
    ImageAstronout,
    ImageBaroque,
    ImageCyberpunk,
    ImageFormal,
    ImageJoker,
    ImageOilPainting,
    ImageShrek,
    ImageZombie,
  ];

  return (
    <>
      <section
        id="feature"
        className="bg-primaryColor z-[20] w-full space-y-10 scroll-mt-[250px]"
      >
        <div className="absolute md:h-[50dvh] lg:h-[70dvh] w-full select-none">
          <div className="-z-4 relative left-0 top-0 h-full w-full translate-y-[-100%] bg-gradient-to-t from-primaryColor to-transparent"></div>
        </div>

        {/* section 1 */}
        <div className=" text-fontPrimaryColor z-10 w-full mx-auto justify-items-center space-y-10">
          {/* Feature Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { type: "Spring", bounce: 0.8 },
            }}
            viewport={{ once: true, amount: 0.8 }}
            className="pb-10 text-center items-center justify-center flex"
          >
            <h1 className="text-3xl font-bold md:text-7xl">Our Features</h1>
          </motion.div>

          {/* Model Features */}
          <ContainerBox boxClass="space-y-20">
            <div className="relative flex w-full items-center justify-center overflow-hidden">
              <div className="absolute right-[7.5%] hidden h-3/5 w-auto md:flex">
                <img src={AiImage5} className="rounded-lg object-fill" />
              </div>
              <div className="absolute left-[7.5%] hidden h-3/5 w-auto md:flex">
                <img src={AiImage4} className="rounded-lg object-fill" />
              </div>
              <div className="absolute right-[7.5%] flex h-4/5 w-auto md:right-[20%]">
                <img src={AiImage3} className="z-6 rounded-lg object-fill" />
              </div>
              <div className="absolute left-[7.5%] flex h-4/5 w-auto md:left-[20%]">
                <img src={AiImage2} className="z-6 rounded-lg object-fill" />
              </div>
              <div className="relative inset-0 flex size-[45%] md:size-[27.5%]">
                <img src={AiImage1} className="z-5 rounded-lg object-fill" />
              </div>
            </div>
            <div className="flex h-2/5 flex-col gap-y-8 text-center">
              <h1 className="text-2xl font-bold md:text-5xl">
                DyahAI-Model Newest Version
              </h1>
              <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
                DyahAI utilizes a state-of-the-art AI model designed to
                transform your ordinary images into vibrant, imaginative
                artworks. Whether you're looking to convert your photos into
                captivating cartoons, futuristic cyberpunk aesthetics, or
                surreal fantasy scenes, our AI model understands the nuances
                of your image and adapts to create stunning visuals that go
                beyond expectations. Powered by advanced algorithms, DyahAI
                delivers a seamless and intuitive experience for anyone
                wanting to see their creations in a completely new light.
              </p>
            </div>
          </ContainerBox>
          {/* </div> */}
          {/* </div> */}

        </div>

        {/* section HD Images & Free To Use */}

        <Container className="flex flex-col md:flex-row justify-center gap-x-8 space-y-10 md:space-y-0 mx-auto">
          {/* HD Image features */}
          <Box className="w-full md:w-3/5">
            <div className="w-full max-h-fit flex flex-col justify-start items-center">
              <div className="flex h-full w-full flex-col items-center justify-items-center gap-y-10 text-center">
                <h1 className="text-2xl font-bold md:text-4xl text-white/90">
                  HD Resolution Image
                </h1>
                <div className="relative w-full overflow-hidden">
                  <BeforeAfterSlider />
                </div>
                <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
                  Quality is our top priority at DyahAI. We understand that
                  generated images should not only be visually stunning but also
                  sharp and clear. Every image created using DyahAI is generated
                  in high resolution, ensuring that your creations are of
                  exceptional quality and ready to be shared, printed, or
                  showcased in their finest form. Whether you plan to use the
                  artwork digitally, for professional presentations, or for
                  personal projects, the clarity and precision of each image are
                  never compromised. Our high-resolution images guarantee the
                  best visual quality and a superior user experience when
                  viewing or enlarging your artwork.
                </p>
              </div>
            </div>
          </Box>


          {/* Free To Use */}
          <Box className="w-full md:w-2/5">
            <div className="w-full max-h-fit flex flex-col justify-start items-center">
              <div className="flex h-full w-full flex-col items-center justify-items-center gap-y-10 text-center">
                <h1 className="text-2xl font-bold md:text-4xl text-white/90">Free-To-Use</h1>
                <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
                  The realistic AI is provided for free as a trial, and the
                  AI-generated results are available exclusively for you during
                  the trial period.
                </p>
                <div className="flex w-full rounded-lg p-2 md:w-[95%] lg:w-[85%]">
                  <FTUImages />
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNavigationGenerate}
                  className="w-2/3"
                  isMotion
                >
                  Try it now !
                </Button>
              </div>
            </div>
          </Box>
        </Container>

        <div className=" text-fontPrimaryColor z-10 w-full mx-auto justify-items-center space-y-10">

          {/* section Various Style */}
          <ContainerBox boxClass="space-y-20">
            <h1 className="text-fontPrimaryColor/90 text-2xl font-bold md:text-4xl text-center">
              Generate AI Images in Various Art Styles
            </h1>
            <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
              DyahAI offers not only beautiful images but also complete freedom
              to tailor your creations to your style. We provide a wide range of
              customizable art styles, including astronaut for a space adventure
              look, cyberpunk with futuristic neon effects, and joker with
              vibrant colors and quirky expressions. Classic options like
              baroque, with intricate details, formal for an elegant touch, and
              painting for a hand-painted feel are also available. For something
              whimsical or eerie, you can choose shrek, a playful cartoon style,
              or zombie, with a horror theme. With these diverse styles, you can
              create a unique image that truly reflects your vision.
            </p>
            <div className="border-borderShade w-full overflow-hidden rounded-lg border-2 border-opacity-40">
              <motion.div
                className="flex gap-4"
                style={{
                  x: useTransform(
                    useSpring(scrollY, { stiffness: 120, damping: 20 }),
                    [2200, 3800],
                    [20, -500]
                  ),
                }}
              >
                {StyleArts.map((StyleArts, index) => (
                  <div key={index} className="w-1/3 flex-shrink-0 md:w-1/5">
                    <img
                      src={StyleArts}
                      alt={`Gallery ${index + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </ContainerBox>
        </div>
      </section>
    </>
  );
};

export default Feature;
