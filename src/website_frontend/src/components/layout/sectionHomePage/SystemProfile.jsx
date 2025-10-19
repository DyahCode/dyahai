import React from 'react'
import ContainerBox, { Box, Container } from '../Container';

const SystemProfile = () => {
  return (
    <ContainerBox containerClass='z-10' boxClass='z-10 text-white space-y-4 my-14'>
      <span >Powered by:</span>
      <div className='w-full flex space-x-4'>
        <Box cursorHover padding className='w-1/3 p-4'>
          <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icon/internet-computer.webp" alt="" />
        </Box>
        <Box cursorHover padding className='w-1/3 p-4 flex justify-center items-center'>
          <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icon/dfinity.webp" alt="" />
        </Box>
        <Box cursorHover padding className='w-1/3 p-4'>
          <img src="https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icon/disruptives-icphubs.webp" alt="" />
        </Box>

      </div>
    </ContainerBox>
  )
}

export default SystemProfile;