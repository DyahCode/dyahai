import React from "react";

import imageSquare1 from "../../../assets/images/gallery/square-image/1.jpeg";
import imageSquare2 from "../../../assets/images/gallery/square-image/2.jpeg";
import imageSquare3 from "../../../assets/images/gallery/square-image/3.jpeg";
import imageSquare4 from "../../../assets/images/gallery/square-image/4.jpeg";
import imageSquare5 from "../../../assets/images/gallery/square-image/5.jpeg";
import imageSquare6 from "../../../assets/images/gallery/square-image/6.jpeg";
import imageSquare7 from "../../../assets/images/gallery/square-image/7.jpeg";
import imageSquare8 from "../../../assets/images/gallery/square-image/8.jpeg";
import imageSquare9 from "../../../assets/images/gallery/square-image/9.jpeg";
import imageSquare10 from "../../../assets/images/gallery/square-image/10.jpeg";

import imagePortrait1 from "../../../assets/images/gallery/portrait-image/1.jpeg";
import imagePortrait2 from "../../../assets/images/gallery/portrait-image/2.jpeg";
import imagePortrait3 from "../../../assets/images/gallery/portrait-image/3.jpeg";
import imagePortrait4 from "../../../assets/images/gallery/portrait-image/4.jpeg";
import imagePortrait5 from "../../../assets/images/gallery/portrait-image/5.jpeg";
import imagePortrait6 from "../../../assets/images/gallery/portrait-image/6.jpeg";
import imagePortrait7 from "../../../assets/images/gallery/portrait-image/7.jpeg";
import imagePortrait8 from "../../../assets/images/gallery/portrait-image/8.jpeg";
import imagePortrait9 from "../../../assets/images/gallery/portrait-image/9.jpeg";
import imagePortrait10 from "../../../assets/images/gallery/portrait-image/10.jpeg";

const Gallery = () => {
  return (
    <>
      <section id="gallery" className="bg-primaryColor scroll-mt-20">
        <div className="border-borderShade container mx-auto flex w-full flex-col items-center space-y-10 rounded-lg border-2 border-opacity-40 px-4 py-16 text-center">
          <h1 className="text-fontPrimaryColor text-3xl font-bold md:text-7xl">
            Creatifully Generate Image
          </h1>
          <div className="container mx-auto">
            <p className="text-fontPrimaryColor text-center text-base leading-relaxed md:text-xl">
              Discover the creative possibilities of DyahAI in our Gallery
              Generate Image, where you can explore a wide variety of stunning
              AI-generated artwork. This gallery showcases the powerful
              capabilities of our platform, turning everyday images into
              extraordinary creations. From whimsical cartoons to futuristic
              cyberpunk, our AI model can transform any image into a beautiful
              piece of art, all rendered in high resolution.
            </p>
          </div>
          <div className="grid h-full w-full grid-cols-2 items-center justify-center overflow-hidden px-5 md:grid-cols-4 md:px-10 lg:grid-cols-5">
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
        </div>
      </section>
    </>
  );
};

export default Gallery;
