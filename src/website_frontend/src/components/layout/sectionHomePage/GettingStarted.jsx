import React from 'react'
import { motion } from "framer-motion";

import Button from "../../ui/Button";
import { usePopup } from '../../../provider/PopupProvider';
import { useAuth } from '../../../provider/authProvider';
import { useNavigate } from 'react-router-dom';


const GettingStarted = () => {
  const { showPopup, hidePopup } = usePopup();
  const { isLoggedIn, Login } = useAuth();
  const navigate = useNavigate()
  const handleNavigationGenerate = () => {
    if (isLoggedIn) {
      navigate('/generate');
    } else {
      showPopup({
        title: "Login Required",
        message: "To use this feature, please log in first. Once you are logged in, you can connect and continue using this feature.",
        type: "warning",
        leftLabel: "Login",
        onLeft: () => { Login() },
        rightLabel: "Cancel",
        onRight: () => { hidePopup() },
      });
      // return;
    }
  };

  return (
    <section className="bg-primaryColor flex w-full h-[50vh] scroll-mt-20 mt-4 mb-0">
      <div className='relative flex flex-col w-full justify-center items-center'>

        <div className='flex flex-col h-[85%] p-2 items-center justify-center absolute space-y-10'>
          <p className="select-none z-10 text-lg font-bold italic text-white text-center">
            Bring Your Imagination to Life with DyahAI Realistic Image
            Generator.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={handleNavigationGenerate}
            isMotion
          >
            Try Now
          </Button>
        </div>
        {/* bg-blend-soft-light */}
        <motion.div
          className="-z-0 bottom-0 overflow-hidden h-full w-full"
          style={{
            background:
              `linear-gradient(
                to top,
                rgba(8, 186, 165, 0.9) 0%,
                rgba(8, 186, 165, 0.7) 15%,
                rgba(8, 186, 165, 0.075) 70%,
                transparent 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      </div>
    </section>
  )
}

export default GettingStarted;