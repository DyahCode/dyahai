import React from 'react'
import HeadSection from '../HeadSection';
import { Box } from '../Container';

const AboutMission = () => {
  return (
    <>
      <HeadSection distance="short">
        <span className="text-2xl md:text-5xl font-semibold text-fontPrimaryColor">
          Our Mission
        </span>
        <div className="w-full flex flex-col items-center">
          <span className="w-[70%] text-lg md:text-xl text-fontPrimaryColor/70">
            We believe that creativity should be open, accessible, and enjoyable for everyone
          </span>
        </div>
      </HeadSection>

      <section className="container">
        <div className='w-full flex flex-col md:flex-row gap-4 lg:gap-8 text-white'>

          {/* mission 1 */}
          <Box cursorHover padding className='w-full md:w-1/3'>
            <div className='flex w-full space-x-4 p-2'>
              {/* icon */}
              <div className='size-10 h-full pt-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-none stroke-accentColor2/90 stroke-[1.7px]'>
                  <g strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 15c.85.63 1.885 1 3 1s2.15-.37 3-1m-.5-4.5V10m-5.5.5h1" />
                    <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
                  </g>
                </svg>
              </div>
              <div className='w-full flex flex-col '>
                <span className="w-[70%] text-lg md:text-xl text-fontPrimaryColor/90">
                  Simplify
                </span>
                <span className="w-full text-xs md:text-sm text-fontPrimaryColor/60">
                  We make digital art creation, making it smooth, fast, and effortless.
                </span>
              </div>
            </div>
          </Box>

          {/* mission 2 */}
          <Box cursorHover padding className='w-full md:w-1/3'>
            <div className='flex w-full space-x-4 p-2'>
              {/* icon */}
              <div className='size-10 h-full pt-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-none stroke-accentColor2/90'>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m8 10l4 2m-4-2v4l4 2m-4-6l4-2l4 2m-4 2l4-2m-4 2v4m4-6v4l-4 2m-2.6 5c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6m18 0c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21m0-18c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4M9.4 3c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C3 6.04 3 7.16 3 9.4" />
                </svg>
              </div>
              <div className='w-full flex flex-col '>
                <span className="w-[70%] text-lg md:text-xl text-fontPrimaryColor/90">
                  Make it accessible
                </span>
                <span className="w-full text-xs md:text-sm text-fontPrimaryColor/60">
                  We make creativity accessible so everyone   can create without limits, high costs, or special skills.
                </span>
              </div>
            </div>
          </Box>

          {/* mission 3 */}
          <Box cursorHover padding className='w-full md:w-1/3'>
            <div className='flex w-full space-x-4 p-2'>
              {/* icon */}
              <div className='size-10 h-full pt-1.5'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-none stroke-accentColor2/90'>
                  <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M3 9.4c0-2.24 0-3.36.436-4.216a4 4 0 0 1 1.748-1.748C6.04 3 7.16 3 9.4 3h5.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4v5.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21H9.4c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6z" />
                    <path d="m16 10l-3.5 3.5l-2-2L8 14" />
                  </g>
                </svg>
              </div>
              <div className='w-full flex flex-col'>
                <span className="w-[70%] text-lg md:text-xl text-fontPrimaryColor/90">
                  Build trust
                </span>
                <span className="w-full text-xs md:text-sm text-fontPrimaryColor/60">
                  We deliver a secure, transparent, and enjoyable experience powered by Web3 innovation.
                </span>
              </div>
            </div>
          </Box>

        </div>
      </section>
    </>
  )
}

export default AboutMission;