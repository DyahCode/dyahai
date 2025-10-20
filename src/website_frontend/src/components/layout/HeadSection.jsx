import React from 'react'
import { motion, useInView } from "framer-motion";
import { ClearBox, Container } from './Container';

const HeadSection = ({ children, type = "default", headerName = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.8 });
  const [playAnimation, setPlayAnimation] = React.useState(false);

  React.useEffect(() => {
    if (isInView) {
      setPlayAnimation(true);
    } else if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top > 0) {
        setPlayAnimation(false);
      }
    }
  }, [isInView]);

  return (
    <Container>
      {/* scroll-mt-40 */}
      <ClearBox className={` px-4 md:px-10 lg:px-16
        ${type === "secondary" ? "pt-[12vh] pb-[8vh]" : "pt-[28vh] pb-[10vh]"}`}>
        <motion.div
          ref={ref}
          animate={playAnimation ? { opacity: 1, scale: 1, y: 0, transition: { type: "spring", bounce: 0.25 } } : { opacity: 0, scale: 0.99, y: 45 }}
          className={`flex flex-col w-full space-y-10 justify-center items-center text-center`}
        >
          {headerName !== "" &&
            <div className='bg-linear-gradient w-fit py-[0.0625rem] px-[0.0825rem] rounded-full overflow-hidden -mb-2'>
              <div className='bg-secondaryColor rounded-full px-2 py-1'>
                <span className='tagline text-n-2 px-2.5'>{headerName}</span>
              </div>
            </div>
          }
          {children}
        </motion.div>
      </ClearBox>
    </Container>

  )
}

export default HeadSection;