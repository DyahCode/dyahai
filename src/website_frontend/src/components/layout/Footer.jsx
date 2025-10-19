// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  const NavigationList = ({ children, href = "" }) => {
    return (
      <a href={href}
        className="w-fit body-2 text-n-1/60 hover:text-n-1 transition-all duration-200 scale-100 hover:scale-105 translate-x-0 hover:translate-x-[0.15rem] border-b border-transparent  hover:border-white pb-1.5">{children}</a>
    )
  }
  return (
    <footer className="relative z-50 w-full h-fit flex flex-col justify-evenly items-end px-[5vw] text-fontPrimaryColor bg-primaryColor pt-20 pb-10">


      <div className="w-full flex flex-col md:flex-row md:justify-between space-y-20 md:space-y-0">

        {/* left section */}
        <div className="flex flex-col items-start justify-start rounded-lg w-full md:w-[35%]">

          <span className="h2 font-semibold select-none pointer-events-none">DyahAI</span>
          <p className="body-2 mt-2 text-fontPrimaryColor/70">
            AI-powered image generation with secure Web3 integration, enabling limitless creativity and redefining digital asset creation.
          </p>

          {/* social media */}
          <div className="mt-8 w-full flex flex-col max-md:items-center">

            <span className="mt-2 body-3 text-n-1/70">Don't miss any news and updates</span>
            <div className="flex flex-row gap-4 mt-4">

              {/* telegram */}
              <a
                href="https://t.me/DyahAIOfficial"
                target="_blank"
                className="size-8 md:size-10 flex items-center justify-center rounded bg-neutral-700/30 fill-fontPrimaryColor/75 p-1 hover:fill-white transition-all duration-100 scale-100 hover:scale-[110%]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M20.464 4.41a.75.75 0 0 1 .277.707l-2.065 13.049l-.003.02a4 4 0 0 1-.064.343a1.1 1.1 0 0 1-.26.49a1.06 1.06 0 0 1-.758.327a1.1 1.1 0 0 1-.53-.145a4 4 0 0 1-.296-.186l-.018-.011l-2.467-1.649l-2.353 1.921a5 5 0 0 1-.342.264a1.1 1.1 0 0 1-.605.21a1.06 1.06 0 0 1-.836-.39a1.1 1.1 0 0 1-.227-.605a5 5 0 0 1-.011-.43v-.01l-.136-3.748l-5.256-1.55l-.026-.007a7 7 0 0 1-.504-.16c-.11-.043-.402-.156-.577-.44a1.05 1.05 0 0 1-.056-1.003c.143-.303.42-.447.525-.501c.134-.07.308-.142.483-.215l15.353-6.384a.75.75 0 0 1 .752.104M10.298 13.16l5.23-4.903l-9.892 3.529zm7.617-5.097l-6.208 5.827l2.944 1.91l2.605 1.741z" />
                </svg>
              </a>

              {/* twitter / X */}
              <a
                href="https://x.com/DyahAIOfficial"
                target="_blank"
                className="size-8 md:size-10 flex items-center justify-center rounded bg-neutral-700/30 fill-fontPrimaryColor/75 p-1 hover:fill-white transition-all duration-100 scale-100 hover:scale-[110%]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19.57 4.488a.75.75 0 0 0-1.14-.976l-5.368 6.274l-5.224-5.938a1.8 1.8 0 0 0-1.357-.598H5.007c-.68 0-1.264.352-1.56.885a1.55 1.55 0 0 0 .204 1.795l6.286 7.147l-5.507 6.435a.75.75 0 1 0 1.14.976l5.368-6.274l5.224 5.938c.345.392.85.598 1.357.598h1.474c.681 0 1.264-.352 1.56-.885a1.55 1.55 0 0 0-.203-1.795l-6.287-7.146z" />
                </svg>
              </a>

              {/* discord */}
              <a
                href="https://discord.gg/4DJxShAF8j"
                target="_blank"
                className="size-8 md:size-10 flex items-center justify-center rounded bg-neutral-700/30 fill-fontPrimaryColor/75 p-1 hover:fill-white transition-all duration-100 scale-100 hover:scale-[110%] stroke-[2px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M9 3.5c-1.826 0-3.207.308-4.72 1.051a.5.5 0 0 0-.209.192C3.032 6.475 1 11.296 1 17a.5.5 0 0 0 .14.348c.952.981 1.817 1.703 2.745 2.213c.933.512 1.905.797 3.055.935a.5.5 0 0 0 .489-.239l.51-.852c-.743-.26-1.502-.605-1.97-1.073a.75.75 0 1 1 1.061-1.06c.255.255.854.545 1.7.816c.699.183 1.916.412 3.27.412s2.571-.229 3.27-.412c.846-.271 1.445-.562 1.7-.816a.75.75 0 1 1 1.06 1.06c-.467.468-1.226.813-1.97 1.073l.511.852a.5.5 0 0 0 .489.24c1.15-.139 2.122-.424 3.055-.936c.928-.51 1.793-1.232 2.744-2.213A.5.5 0 0 0 23 17c0-5.704-2.032-10.525-3.071-12.257a.5.5 0 0 0-.209-.192C18.207 3.808 16.826 3.5 15 3.5a.5.5 0 0 0-.474.342L14.19 4.85A7.2 7.2 0 0 0 12 4.5a7.2 7.2 0 0 0-2.19.35l-.336-1.008A.5.5 0 0 0 9 3.5m1 9.25c0 .966-.672 1.75-1.5 1.75S7 13.716 7 12.75S7.672 11 8.5 11s1.5.784 1.5 1.75m5.5 1.75c.828 0 1.5-.784 1.5-1.75S16.328 11 15.5 11s-1.5.784-1.5 1.75s.672 1.75 1.5 1.75" clipRule="evenodd" />
                </svg>
              </a>

              {/* youtube */}
              <a
                href="https://www.youtube.com/@DyahAIOfficial/"
                target="_blank"
                className="size-8 md:size-10 flex items-center justify-center rounded bg-neutral-700/30 fill-fontPrimaryColor/75 p-1 hover:fill-white transition-all duration-100 scale-100 hover:scale-[110%]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M6.443 4.381C7.84 4.25 9.637 4.25 11.96 4.25h.082c2.322 0 4.119 0 5.516.131c1.407.133 2.517.406 3.409 1.03c.928.65 1.377 1.511 1.587 2.607c.197 1.024.197 2.321.197 3.907v.15c0 1.586 0 2.883-.197 3.907c-.21 1.096-.659 1.957-1.587 2.607c-.892.624-2.002.897-3.41 1.03c-1.396.131-3.193.131-5.515.131h-.082c-2.322 0-4.119 0-5.516-.131c-1.407-.133-2.517-.406-3.409-1.03c-.928-.65-1.377-1.511-1.587-2.607c-.197-1.024-.197-2.321-.197-3.907v-.15c0-1.586 0-2.883.197-3.907c.21-1.096.659-1.957 1.587-2.607c.892-.624 2.002-.897 3.41-1.03m5.115 4.564a1.166 1.166 0 0 0-1.608.313c-.13.191-.2.418-.2.65v4.184a1.16 1.16 0 0 0 1.8.968l3.175-2.074a1.155 1.155 0 0 0 .008-1.931z" />
                </svg>
              </a>

              {/* github */}
              <a
                href="https://github.com/WAW1311/dyahai-2.0/"
                target="_blank"
                className="size-8 md:size-10 flex items-center justify-center rounded bg-neutral-700/30 stroke-fontPrimaryColor/75 p-1 hover:stroke-white transition-all duration-100 scale-100 hover:scale-[110%] stroke-[2px]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="stroke-[1.5px]">
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 15.668q.675.081 1 .618c.326.537 1.537 2.526 2.913 2.526H9.5m5.672-3.513q.823 1.078.823 1.936V21m-5.625-5.609q-.87.954-.869 1.813V21" />
                    <path d="M15.172 15.299c1.202-.25 2.293-.682 3.14-1.316c1.448-1.084 2.188-2.758 2.188-4.411c0-1.16-.44-2.243-1.204-3.16c-.425-.511.819-3.872-.286-3.359c-1.105.514-2.725 1.198-3.574.947c-.909-.268-1.9-.416-2.936-.416c-.9 0-1.766.111-2.574.317c-1.174.298-2.296-.363-3.426-.848c-1.13-.484-.513 3.008-.849 3.422C4.921 7.38 4.5 8.44 4.5 9.572c0 1.653.895 3.327 2.343 4.41c.965.722 2.174 1.183 3.527 1.41" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>


        {/* right section */}
        <div className="flex flex-col md:flex-row gap-x-2 items-start justify-start rounded-lg max-md:w-full md:w-[40%] lg:w-[35%] max-md:space-y-10">

          {/* Col 1 */}
          <div className="flex flex-col items-start justify-start rounded-lg w-full text-fontPrimaryColor/60">
            <div className="w-full mb-4">
              <span className="font-semibold text-accentColor/70 text-sm uppercase tracking-wider">company</span>
            </div>
            <div className="w-full space-y-1 md:space-y-2 text-md text-left flex flex-col">
              <NavigationList href="/#about">
                About
              </NavigationList>
              <NavigationList href="/pricing/#plan">
                Join our team
              </NavigationList>
              <NavigationList href="/pricing">
                Partner with us
              </NavigationList>
              <NavigationList href="/pricing/#faqs">
                FAQs
              </NavigationList>
              <NavigationList href="/terms">
                Terms of service
              </NavigationList>
            </div>
          </div>


          {/* Col 2 */}
          <div className="flex flex-col items-start justify-start rounded-lg w-full text-fontPrimaryColor/60">
            <div className="w-full mb-4">
              <span className="font-semibold text-accentColor/70 text-sm uppercase tracking-wider">Products</span>
            </div>
            <div className="w-full space-y-1 md:space-y-2 text-md text-left flex flex-col">
              <NavigationList href="/pricing/#plan">
                Pricing
              </NavigationList>
              <NavigationList href="/topup">
                Topup Credit
              </NavigationList>
              <NavigationList href="/#feature">
                Our Models
              </NavigationList>
              <NavigationList href="/#feature">
                How it Works
              </NavigationList>
            </div>
          </div>

        </div>
      </div>

      {/* separate border */}
      <div className="w-full border border-separate rounded-full border-borderShade/50 mt-20 mb-6"></div>

      {/* section copyright */}
      <div className="w-full h-fit flex flex-col md:flex-row justify-between text-center items-center">
        <p className="navigation text-n-1/40">2024 © All Rights Reserved</p>
        <p className="navigation text-n-1/40 group">
          Made with <span className="group-hover:text-[#BA6573] px-1">❤</span> by DyahCode
        </p>
      </div>

    </footer >
  );
};

export default Footer;
