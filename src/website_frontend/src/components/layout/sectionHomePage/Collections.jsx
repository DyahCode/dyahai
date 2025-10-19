import React from "react";
import ContainerBox, { Box, Container } from "../Container";
import HeadSection from "../HeadSection";
import Button from "../../ui/Button";

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

const Collections = () => {
  return (
    <>
      {/* head section */}

      <HeadSection headerName="Collections">
        <h1 className="h1 text-n-1">
          Where AI<br />meets imagination
        </h1>
        <h2 className="h3 text-n-1">
          Explore stunning collections minted by Creators.
        </h2>
        <span className="header-1 text-n-3/80">
          Explore unique collections crafted by our community — each image minted and owned by its creator.
          From hyper-realistic portraits to surreal digital art, every piece reflects the limitless creativity of DyahAI.
          Dive into the gallery and see how imagination meets innovation.
        </span>
        <Button>
          Explore NFTs Collection
        </Button>
      </HeadSection>

      {/* body section */}
      <section id="collections"
        className="scroll-mt-[650px]">

        <ContainerBox boxClass="">
          <div className="px-10 py-20 grid h-full w-full grid-cols-2 items-center justify-center overflow-hidden md:grid-cols-4 lg:grid-cols-5">
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

export default Collections;
