import React from 'react'
import HeadSection from '../HeadSection';
import { Box } from '../Container';

const AboutTeamBase = () => {
  return (
    <>
      <HeadSection distance="short">
        <span className="text-2xl md:text-5xl font-semibold text-fontPrimaryColor">
          Who are we
        </span>
      </HeadSection>

      <section className="container text-center">
        <Box className='w-full flex'>
          <div className='flex flex-col text-start space-y-2'>

            <p className="w-full text-lg md:text-xl text-fontPrimaryColor/70">
              DyahAI was founded with strong confidence in advancing AI modeling for image generation.
              Our team was formed as a commitment to developing next-generation AI and to actively participate in innovation challenges.
            </p>
            <p className="w-full text-lg md:text-xl text-fontPrimaryColor/70">
              We began our journey by joining the Internet Computer (ICP) Hackathon, where DyahAI was born as part of the transformation to bring Web3-powered creativity into the world.
            </p>
          </div>
        </Box>
      </section>
    </>
  )
}

export default AboutTeamBase;