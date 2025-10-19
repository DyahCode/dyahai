import React from "react";
import ContainerBox, { Box, Container } from "../Container";
import HeadSection from "../HeadSection";

const imageSquare1 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/1.webp"
const imageSquare2 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/2.webp"
const imageSquare3 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/3.webp"
const imageSquare4 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/4.webp"
const imageSquare5 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/5.webp"
const imageSquare6 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/6.webp"
const imageSquare7 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/7.webp"
const imageSquare8 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/8.webp"
const imageSquare9 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/9.webp"
const imageSquare10 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/square-image/10.webp"

const imagePortrait1 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/1.webp"
const imagePortrait2 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/2.webp"
const imagePortrait3 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/3.webp"
const imagePortrait4 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/4.webp"
const imagePortrait5 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/5.webp"
const imagePortrait6 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/6.webp"
const imagePortrait7 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/7.webp"
const imagePortrait8 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/8.webp"
const imagePortrait9 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/9.webp"
const imagePortrait10 = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/gallery/portrait-image/10.webp"

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
