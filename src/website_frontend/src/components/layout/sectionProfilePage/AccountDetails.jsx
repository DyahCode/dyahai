import React from "react";
const HeroProfile = "https://bafybeifd7wtlh57fd7sfynkpupg625gp6cbno3kplxiardb5i7aa5zxp6y.ipfs.w3s.link/image-gallery-1.jpg"

const AccountDetails = ({ principalId }) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col border border-borderShade border-opacity-40 rounded-xl bg-secondaryColor min-w-fit px-6 py-8">

      <p className="pb-2 pl-1 md:text-lg md:font-semibold text-neutral-300">
        Account Details
      </p>
      <div className="flex border-separate flex-col gap-1 rounded-lg p-1 mt-4">

        {/* section header */}
        <div className="border-borderShade flex flex-col rounded-md border border-opacity-20 md:flex-row p-2 xl:px-20">
          <div className="w-full flex flex-col md:flex-row items-center justify-start">

            {/* profile */}
            <div className="flex justify-center items-center">
              <svg viewBox="0 0 24 24" className="w-20 h-20 md:w-32 md:h-32">
                {/* <!-- Hexsagon Outsdide --> */}
                <path className="fill-none stroke-white stroke-[1.5px]"
                  d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75"
                />
                {/* <!-- Image Clip Path --> */}
                <defs>
                  <clipPath id="hexClip">
                    <path
                      d="M12 1.75a2.63 2.63 0 0 0-1.32.355l-6.61 3.8l-.002.002A2.65 2.65 0 0 0 2.75 8.198v7.603a2.64 2.64 0 0 0 1.318 2.292l.003.002l6.608 3.799h.002a2.63 2.63 0 0 0 2.639 0h.001l6.608-3.8h.003A2.65 2.65 0 0 0 21.25 15.8V8.2a2.65 2.65 0 0 0-1.318-2.292l-6.61-3.8l-.002-.002A2.63 2.63 0 0 0 12 1.75"
                    />
                  </clipPath>
                </defs>
                {/* <!-- Image In Hexagon --> */}
                <image
                  className="size-full object-cover"
                  href={HeroProfile}
                  clipPath="url(#hexClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
            {/* profile */}

            <div className="flex-1 flex flex-col items-center md:items-start">
              <p className="text-fontPrimaryColor/75 text-sm py-0.5 px-2 border border-borderShade border-opacity-20 rounded-md bg-accentColor/[0.075] mb-1">
                ID Principal
              </p>
              <div className="bg-accentColor/[0.075] py-1 px-2 border border-borderShade border-opacity-20 rounded-md overflow-hidden break-all">

                <p className="text-base/4 font-medium font-mono text-accentColor w-full lining-nums line-clamp-2">{principalId}</p>
              </div>
            </div>




          </div>
        </div>




        <div className="border-borderShade flex flex-col gap-y-2 rounded-md border border-opacity-20 p-2 text-sm md:flex-row md:text-base">
          <p className="md:w-1/3">
            <strong className="">Username</strong>
          </p>
          <p className="md:w-2/3">DyahAI</p>
        </div>
        <div className="border-borderShade flex flex-col gap-y-2 rounded-md border border-opacity-20 p-2 text-sm md:flex-row md:text-base">
          <p className="md:w-1/3">
            <strong>Principal ID</strong>
          </p>
          <p className="md:w-2/3">{principalId}</p>
        </div>
        <div className="border-borderShade flex flex-col gap-y-2 rounded-md border border-opacity-20 p-2 text-sm md:flex-row md:text-base">
          <p className="md:w-1/3">
            <strong>Create At</strong>
          </p>
          <p className="md:w-2/3">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
