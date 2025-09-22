import React from "react";
import ContainerBox, { Box, Container } from "../Container";
import HeadSection from "../HeadSection";

const imageSquare1 = "https://bafybeiacelbfiajmplzorraly754mdnwbopgknoiekwtrmetgukeiqwrzi.ipfs.w3s.link/1.jpg"
// const imageSquare2 = "https://bafybeibdtisgtgdyak7qfqfnpmhxwuqe4u33cyrica2zo6ltefhilvibvu.ipfs.w3s.link/2.jpg" //error
const imageSquare2 = "https://bafybeihuewv7uxhsk2oj4a2erfbkyaatlrcomtegxdq54erha2q47bxr3i.ipfs.w3s.link/?filename=2.jpg"
const imageSquare3 = "https://bafybeidekxisel7qtgkzkerkykcvgineghwvraxpjhaq6cnjfjtbf35unm.ipfs.w3s.link/3.jpg"
const imageSquare4 = "https://bafybeiec4c73jdjr6rto647ulokbfefs3cijuxghuvnaxhyrgig6prd5fe.ipfs.w3s.link/4.jpg"
const imageSquare5 = "https://bafybeiell5kvsdnrixaiqungptykgdupvgvm43f3oko5y2aslbqg3b75ku.ipfs.w3s.link/5.jpg"
const imageSquare6 = "https://bafybeia3v2fas6ygtkz3lr4qx3wxhv5527fixbicohm4xa5rcqxiraereq.ipfs.w3s.link/6.jpg"
const imageSquare7 = "https://bafybeicmcskoiqxv6656ti5vdqwqgfzm5mhjcj7tmpcm52y4skdrdmnja4.ipfs.w3s.link/7.jpg"
const imageSquare8 = "https://bafybeigdgnwvtk5ircqynj7fudujlw6bdj5bto476h2ablxanq65iotwxu.ipfs.w3s.link/8.jpg"
const imageSquare9 = "https://bafybeigtxs7i3yaqemtezkfz74uymotdpsh5numejsdzbjcfdj7vygafnu.ipfs.w3s.link/9.jpg"
const imageSquare10 = "https://bafybeidov3fy6pk5vu5kje3ysjp6gihc6qk5hxjf7chaowefjw6nr2ct4e.ipfs.w3s.link/10.jpg"

const imagePortrait1 = "https://bafybeid5rkcqpk6e3cvigbxrwhthuksyv554p7qyeahjjeblvegvahgr3a.ipfs.w3s.link/1.jpg"
const imagePortrait2 = "https://bafybeigiggapflossqcjk4g7m5upi332h6hnxgm7umigu55pg5ihp35efq.ipfs.w3s.link/2.jpg"
const imagePortrait3 = "https://bafybeidcr6e5u5yykcn54oadfepe3rm63o5n5hspoikjra24pnykally7y.ipfs.w3s.link/3.jpg"
const imagePortrait4 = "https://bafybeihqd2kv22f2gq4f3f4j45qlkqhltkfqqqxjnibfqh4k5zj2sble5u.ipfs.w3s.link/4.jpg"
const imagePortrait5 = "https://bafybeigxewba73jvkxk2r7wvpci6hlokbbpbvqumupl64khtbknlv3z7k4.ipfs.w3s.link/5.jpg"
const imagePortrait6 = "https://bafybeia7utgnwfasb2gvzelbsfqbei5gvpvjldcrqvijlphojs5qhom4zq.ipfs.w3s.link/6.jpg"
// const imagePortrait7 = "https://bafybeiafqwfuybsokptz2efjy3jodckrfoajgeq4u3moqtqk4jka4eym6y.ipfs.w3s.link/7.jpg" //error
const imagePortrait7 = "https://bafybeid5gpibnx7uxp5xujspnzti63e67khhi4n7m27nj7el6ek5h65adu.ipfs.w3s.link/?filename=7.jpg"
const imagePortrait8 = "https://bafybeiguficfp3wgrxcd5677r4ck6nxwbzi3esqz4tghgz3rskefjnp3ru.ipfs.w3s.link/8.jpg"
// const imagePortrait9 = "https://bafybeicpj2pie2y7sf5dvbzfqg5sgn5p3xuw2rqbu3t2rqbbzu6ltckhve.ipfs.w3s.link/9.jpg" //error
const imagePortrait9 = "https://bafybeibqbml5xgxqvgyxzxx7d3ujd5r4cfdqp27z6mxgngsbxda5lk47sm.ipfs.w3s.link/?filename=9.jpg"
const imagePortrait10 = "https://bafybeifh5kxkqyjh5naxphlvo4vxls4eupp2fubymjqeqhq2znpmtr6jwi.ipfs.w3s.link/10.jpg"

const Gallery = () => {
  return (
    <>
      {/* head section */}
      <HeadSection backgroundMotion>
        <span className="text-4xl font-bold md:text-7xl text-fontPrimaryColor">
          Our Gallery
        </span>
      </HeadSection>

      {/* body section */}
      <section
        id="gallery"
        className="scroll-mt-[650px]">
        <ContainerBox boxClass="space-y-10 text-center">
          <span className="text-fontPrimaryColor/95 text-3xl font-bold md:text-7xl">
            Creatifully Generate Image
          </span>
          <Container className="md:px-10">
            <p className="text-fontPrimaryColor/80 text-center text-base leading-relaxed md:text-xl">
              Discover the creative possibilities of DyahAI in our Gallery
              Generate Image, where you can explore a wide variety of stunning
              AI-generated artwork. This gallery showcases the powerful
              capabilities of our platform, turning everyday images into
              extraordinary creations. From whimsical cartoons to futuristic
              cyberpunk, our AI model can transform any image into a beautiful
              piece of art, all rendered in high resolution.
            </p>
          </Container>
          <div className="grid h-full w-full grid-cols-2 items-center justify-center overflow-hidden md:grid-cols-4 lg:grid-cols-5">
            <div className="space-y-2 p-1">
              <div className="size-full h-2/5">
                <img
                  src={imageSquare1}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait1}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2 p-1">
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait2}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-2/5">
                <img
                  src={imageSquare2}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2 p-1">
              <div className="size-full h-2/5">
                <img
                  src={imageSquare3}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait3}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-2 p-1">
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait4}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-2/5">
                <img
                  src={imageSquare4}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="hidden space-y-2 p-1 md:block">
              <div className="size-full h-2/5">
                <img
                  src={imageSquare5}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait5}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="hidden space-y-2 p-1 md:block">
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait6}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-2/5">
                <img
                  src={imageSquare6}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="hidden space-y-2 p-1 md:block">
              <div className="size-full h-2/5">
                <img
                  src={imageSquare7}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait7}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="hidden space-y-2 p-1 md:block">
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait8}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-2/5">
                <img
                  src={imageSquare8}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="hidden space-y-2 p-1 lg:block">
              <div className="size-full h-2/5">
                <img
                  src={imageSquare9}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait9}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>

            <div className="hidden space-y-2 p-1 lg:block">
              <div className="size-full h-3/5">
                <img
                  src={imagePortrait10}
                  alt="gallery-2"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
              <div className="size-full h-2/5">
                <img
                  src={imageSquare10}
                  alt="gallery-1"
                  className="rounded-md object-cover md:rounded-2xl"
                />
              </div>
            </div>
          </div>
          {/* </div> */}
        </ContainerBox>

      </section>
    </>
  );
};

export default Gallery;
