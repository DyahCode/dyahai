import React from 'react'
import ContainerBox, { Box, Container } from '../Container';

const SystemProfile = () => {
  return (
    <ContainerBox containerClass='z-10' boxClass='z-10 text-white space-y-4 my-14'>
      <span >Powered by:</span>
      <div className='w-full flex space-x-4'>
        <Box cursorHover padding className='w-1/3 p-4'>
          <img src="https://bafybeihhxgz3hcadrog27g6uhzf3ehpmralv6s6y6xhptwbo4kndx6ryaa.ipfs.w3s.link/internet-computer.PNG" alt="" />
        </Box>
        <Box cursorHover padding className='w-1/3 p-4 flex justify-center items-center'>
          <img src="https://bafybeieh3bork6ih4hrq6c3ey64jpz6fulllzqx4dvy3airmrsjxzvaciy.ipfs.w3s.link/dfinity.PNG" alt="" />
        </Box>
        <Box cursorHover padding className='w-1/3 p-4'>
          <img src="https://bafybeidvuojvhsjvywod4zjj3iletj6s2ppjt6hcnqxrq57cegko42ufqa.ipfs.w3s.link/disruptives-icphubs.png" alt="" />
        </Box>

      </div>
    </ContainerBox>
  )
}

export default SystemProfile;