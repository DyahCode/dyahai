import React, { useState } from "react";
import HeadSection from "../HeadSection";

const teams = [
  {
    name: "Bayu",
    surName: "Bayu Anggoro Sunu",
    job: "Frontend Dev",
    status: "Undergraduated",
    statusBase: "Universitas Teknologi Yogyakarta",
    githubUsername: "yubayu0",
    image: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/profile/yubayu0.webp",
  },
  {
    name: "Thoriq",
    surName: "Zaini Thoriq Taufiqurrahman",
    job: "AI Engineer",
    status: "Undergraduated",
    statusBase: "Universitas Teknologi Yogyakarta",
    githubUsername: "thoriqtau",
    image: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/profile/thoriqtau.webp",
  },
  {
    name: "Wahyu",
    surName: "Wahyu Andre Wibowo",
    job: "Backend Dev",
    status: "Undergraduated",
    statusBase: "Universitas Teknologi Yogyakarta",
    githubUsername: "WAW1311",
    image: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/profile/WAW1311.webp",
  },
  {
    name: "Lutfi",
    surName: "M. Fadhil Lutfi",
    job: "Backend Dev",
    status: "Undergraduated",
    statusBase: "Universitas Teknologi Yogyakarta",
    githubUsername: "lutfimizaki",
    image: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/profile/lutfimizaki.webp",
  },
  {
    name: "Hasby",
    surName: "Muhammad Hasby Muharraman",
    job: "Frontend Dev",
    status: "Undergraduated",
    statusBase: "Universitas Teknologi Yogyakarta",
    githubUsername: "iAnoeloeby",
    image: "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/profile/iAnoeloeby.webp",
  },
];

const TeamProfile = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCard = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <HeadSection headerName="Teams">
        <span className="h2 text-n-1">
          Meet DyahCode Team
        </span>
        <span className="header-1 text-n-3/80">
          Our team is customer-obsessed, agile, growth-oriented, and multifaceted. We like to work hard, but we have a lot of fun too.
        </span>
      </HeadSection>

      <section className="container">
        <div className="flex flex-col md:flex-row gap-8 md:gap-4 justify-center">
          {teams.map((teamProfile, index) => (
            <div
              key={index}
              onClick={() => toggleCard(index)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 ease-out bg-center bg-cover flex items-end h-[20rem] md:h-[12rem] lg:h-[16rem] xl:h-[20rem] ${activeIndex === index
                ? "w-full md:w-[55vh] shadow-2xl"
                : "w-full md:w-72"
                }`}
              style={{
                backgroundImage: `url(${teamProfile.image})`,
                backgroundSize: window.innerWidth >= 768 ? "140%"
                  : activeIndex === index ? "140%" : "100%",
                backgroundPosition: `50% ${activeIndex === index ? "35%" : "45%"}`,
              }}
            >
              <div className={`absolute w-full h-full bg-gradient-to-t from-black/90 to-transparent to-50%`} />

              <div
                className={`relative z-0 w-full bottom-0 text-white px-3 pb-2 transition-all duration-500 h-fit`}
              >
                {/* github icon */}
                <div className="absolute bottom-0 right-0 z-10 pb-1.5 pr-1.5">
                  <a
                    href={`https://github.com/${teamProfile.githubUsername}/`}
                    target="_blank"
                    className="size-6 md:size-8 flex items-center justify-center rounded-full bg-neutral-700/40 stroke-fontPrimaryColor/75 pt-1.5 p-1 hover:stroke-white transition-all duration-100 scale-100 hover:scale-[110%] stroke-[2px]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="stroke-[1.5px]">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.5 15.668q.675.081 1 .618c.326.537 1.537 2.526 2.913 2.526H9.5m5.672-3.513q.823 1.078.823 1.936V21m-5.625-5.609q-.87.954-.869 1.813V21" />
                        <path d="M15.172 15.299c1.202-.25 2.293-.682 3.14-1.316c1.448-1.084 2.188-2.758 2.188-4.411c0-1.16-.44-2.243-1.204-3.16c-.425-.511.819-3.872-.286-3.359c-1.105.514-2.725 1.198-3.574.947c-.909-.268-1.9-.416-2.936-.416c-.9 0-1.766.111-2.574.317c-1.174.298-2.296-.363-3.426-.848c-1.13-.484-.513 3.008-.849 3.422C4.921 7.38 4.5 8.44 4.5 9.572c0 1.653.895 3.327 2.343 4.41c.965.722 2.174 1.183 3.527 1.41" />
                      </g>
                    </svg>
                  </a>
                </div>

                <span className="text-lg font-bold">{teamProfile.name}</span>
                <div className={`relative w-full transition-all duration-500 ${activeIndex === index
                  ? "delay-200 opacity-100 h-fit translate-y-0"
                  : "delay-0 opacity-0 h-0 translate-y-8"
                  }`}>
                  <p className={`text-sm font-extralight flex`}>
                    as <p className="ml-1 text-accentColor font-semibold">{teamProfile.job}</p>
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section >
    </>
  );
}

export default TeamProfile;