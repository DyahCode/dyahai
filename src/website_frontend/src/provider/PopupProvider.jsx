import React from 'react'
import Button from '../components/ui/Button';
import { v4 as uuidv4 } from 'uuid';
import { buttonAccent, gradientBackground, typeIcons } from '../components/ui/Popup/PopupVariants';

const PlugWalletLogo = "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icon/plug-wallet-logo.webp";

const PopupContext = React.createContext();
export const usePopup = () => React.useContext(PopupContext);

/**
 * @typedef { "default" | "loading" | "success" | "warning" | "error" } PopupType
 */

/**
 * @typedef PopupOptions
 * @property {string} title
 * @property {string} message
 * @property {PopupType=} type
 * @property {string=} leftLabel
 * @property {() => void=} onLeft
 * @property {string=} rightLabel
 * @property {() => void=} onRight
 * @property {() => void=} onClose
 */

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = React.useState([]);

  /**
   * @param {PopupOptions & {progress?: number}} param0
   */

  const showPopup = ({ title, message, type = "default", leftLabel = "OK", onLeft, rightLabel, onRight, onClose, progress = 0, extend = null, extendMessage = [], ConnectButtonPopup = false, props, }) => {
    const id = uuidv4();
    setPopups(prev => [...prev, {
      id,
      type,
      title,
      message,
      leftLabel,
      rightLabel,
      onLeft,
      onRight,
      onClose,
      progress,
      extend,
      extendMessage,
      ConnectButtonPopup,
      props
    }]);
  };

  const hidePopup = (id) => {
    if (id) {
      setPopups(prev => prev.filter(p => p.id !== id));
    } else {
      setPopups([]);
    }
  };

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}

      {popups.map(popupData => (
        <section
          key={popupData.id}
          className={`flex flex-col space-y-20 w-full h-full justify-center items-center fixed inset-0 bg-black/20 z-[999] backdrop-blur-sm place-items-center transition-opacity duration-300`}>

          {/* <!-- Card --> */}
          <div className="relative max-w-[38rem] min-h-[16rem] w-[90%] grid place-content-center place-items-center text-center rounded-xl opacity-95 hover:opacity-100 transition-opacity duration-200 bg-primaryColor overflow-hidden shadow-[0.063em_0.75em_1.563em_rgba(0,0,0,0.78)]">

            {/* close button */}
            <div className="absolute top-0 left-0 right-0 w-full flex items-center justify-end px-3 pt-3 z-50">
              <button onClick={() => {
                if (popupData.onClose) popupData.onClose();
                if (popupData.type == "loading" && popupData.onLeft) popupData.onLeft();
                hidePopup(popupData.id);
              }}
                className='p-1 rounded-full aspect-square bg-transparent group hover:bg-neutral-800/10'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className="w-6 cursor-pointer text-white/50 group-hover:text-white/80 stroke-[2px] fill-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* switch notification or connect popup */}
            {popupData.ConnectButtonPopup ? (
              <>
                {/* gradient */}
                <div className={`w-full h-full absolute -z-0 ${gradientBackground['success']} `} />

                {/* content */}
                <ConnectButton {...popupData} key={popupData.id} hidePopup={hidePopup} />
              </>
            ) : (
              <>
                {/* gradient */}
                <div className={`w-full h-full absolute -z-0 ${gradientBackground[popupData.type]} `} />

                {/* content */}
                <Notification
                  popupData={popupData}
                  key={popupData.id}
                  hidePopup={hidePopup} />
              </>
            )}

          </div>
        </section>
      ))
      }
    </PopupContext.Provider >
  );
}

// Connect content
const ConnectButton = ({ id, hidePopup, props }) => {
  const PlugWalletLogo =
    "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icons/plug-wallet.webp";
  const IdentityLogo =
    "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icons/icp-icons.webp";

  const { onConnect } = props || {};

  const handleConnect = (type) => {
    if (onConnect) onConnect(type, id);
    hidePopup(id);
  };
  return (
    <div className='w-full h-full flex flex-col relative p-8' >
      <div className='w-full flex flex-col'>

        <h3 className="h3 text-n-1 mt-8 mb-10">
          Connect Wallet
        </h3>
        <p className="body-2 leading-tight text-n-1/50">
          Connect your wallet or Internet Identity to continue.
          This login method ensures a secure and decentralized way to access your DyahAI account — no passwords, no hassle, just your identity on the blockchain.
        </p>
      </div>

      <div className='w-full flex space-x-2 mt-10 mb-2 justify-center items-center'>
        <div className='w-[10%] h-0 border border-n-1/5' />
        <span className='tagline text-n-1/30'>Connect with</span>
        <div className='w-[10%] h-0 border border-n-1/5' />
      </div>

      <div className="w-full flex flex-col gap-y-4 mb-10">
        <Button type='outline' centering
          onClick={() => handleConnect("InternetIdentity")}
        >
          <div className='h-[2.5rem] flex items-center justify-center text-center space-x-2'>
            <div className='w-6'>
              <img src={IdentityLogo} className="size-full" />
            </div>
            <span>Login with Internet Identity</span>
          </div>
        </Button>

        <Button type='outline' centering
          onClick={() => handleConnect("Plug")}
        >
          <div className='h-[2.5rem] flex items-center justify-center text-center space-x-2'>
            <div className='w-6 h-fit'>
              <img src={PlugWalletLogo} className="size-6" />
            </div>
            <span>Login with Plug Wallet</span>
          </div>
        </Button>
        
        <div className='w-full flex flex-col items-center text-center'>
          <span className='text-center text-n-1/40 text-xs leading-snug font-thin tracking-[0.031rem]'>Before continue, {` `}
            <span className='cursor-pointer hover:underline underline-offset-4' onClick={() => {
              window.open(
                "https://chromewebstore.google.com/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm?pli=1",
                "_blank"
              );
            }}>
              Install Plug Wallet Extension from Chrome Web Store.
            </span>
            {` `} Learn more about {` `}
            <span
              className='cursor-pointer hover:underline underline-offset-4'
              onClick={() => {
                window.open("https://plugwallet.ooo/", "_blank");
              }}
            >
              Plug Wallet
            </span>
          </span>

        </div>
      </div>

      <div className='w-full flex flex-col items-center'>
        <Button type="secondary"
          onClick={() => hidePopup(id)}
        >
          Cancel
        </Button>
      </div>

      <div className='mt-8 mb-4'>
        <span className='body-2 leading-tight text-n-1/40'>Your session is verified on-chain. <br />DyahAI never stores your private keys or wallet credentials.</span>
      </div>
    </div>
  );
};
// Notification content
const Notification = ({ popupData, hidePopup }) => {
  const PlugWalletLogo =
    "https://cdn.jsdelivr.net/gh/DyahCode/testing-assets@main/icons/plug-wallet.webp";
  return (
    <div  className='w-full h-full flex flex-col relative p-8' >
      <div className="w-full text-left flex flex-col sm:flex-row sm:items-end sm:text-left">

        {/* icon */}
        <div className='flex place-content-center items-center justify-center h-full w-12 sm:w-16'>
          {typeIcons[popupData.type]}
        </div>

        {/* text */}
        <div className="sm:ml-8 space-y-2">
          <span className="text-left text-n-1 h5 tracking-[0.035em] mt-2.5 mb-4 ">
            {popupData.title}
          </span>
          <p className="text-left text-[#cccccc] body-2 tracking-[0.031rem]" dangerouslySetInnerHTML={{ __html: popupData.message }} />

          {/* extend content */}
          {/* plug wallet required */}
          {popupData.extend === "plugInstruction" && (
            <div className='w-full flex flex-col space-y-2 pt-2'>
              <span className='text-left text-[#aaaaaa] text-xs tracking-[0.031rem]'>Continue to Install Plug Wallet Extension from below</span>

              <Button withIcon
                onClick={() => {
                  window.open(
                    "https://chromewebstore.google.com/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm?pli=1",
                    "_blank"
                  );
                }}
              >
                <div className='h-[2.5rem] flex items-center justify-center text-center space-x-2'>
                  <div className='w-6 h-fit'>
                    <img src={PlugWalletLogo} className="size-6" />
                  </div>
                  <span>Install Extension from Chrome Web Store</span>
                </div>
              </Button>
              <div className='w-full flex justify-center'>
                <span
                  className='text-[#aaaaaa] text-[10px] tracking-[0.031rem] cursor-pointer hover:underline underline-offset-4'
                  onClick={() => {
                    window.open("https://plugwallet.ooo/", "_blank");
                  }}
                >
                  Learn more about Plug Wallet
                </span>
              </div>
            </div>
          )}

          {/* extend message */}
          {popupData.extend === "message" && popupData.extendMessage && (
            <div className="w-full flex flex-col space-y-0.5 p-1.5 rounded-md border border-borderShade bg-white/[2.5%]">
              {Object.entries(popupData.extendMessage).map(([key, value]) => (
                <div
                  key={key}
                  className="w-full flex text-left text-[#aaaaaa] text-xs tracking-[0.035rem]"
                >
                  <span className='w-3/12 md:w-2/12 break-all'>
                    {key}
                  </span>
                  <span className='w-fit pr-1'>:</span>
                  <span className='w-full text-fontPrimaryColor break-all proportional-nums'>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* button */}
      <div className="w-full mt-6 flex items-center justify-center space-x-6 text-sm">

        {/* for loading only */}
        {popupData.type === "loading" && (
          <div className='w-full text-end space-y-1'>
            <span className='text-white text-sm'>{popupData.progress}%</span>
            <div className="relative w-full bg-neutral-700/25 h-2.5 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-sky-800 to-sky-500 rounded-full transition-all duration-300"
                style={{ width: `${popupData.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* button Left (Always) */}
        <button onClick={() => {
          if (popupData.onLeft) popupData.onLeft();
          hidePopup(popupData.id);
        }}
          className={`bg-[#222127] ${buttonAccent[popupData.type]} text-white rounded px-8 py-2 transition-all ease-in-out duration-150 select-none`}
          style={{ hover: `${buttonAccent[popupData.type]}` }}
        >
          <span>{popupData.leftLabel}</span>
        </button>

        {/* button Right */}
        {popupData.rightLabel && (
          <button onClick={() => {
            if (popupData.onRight) popupData.onRight();
            hidePopup(popupData.id);
          }}
            className="bg-[#222127] hover:bg-neutral-400/40 text-white rounded px-8 py-2 transition-all ease-in-out duration-150 select-none">
            <span>{popupData.rightLabel}</span>
          </button>
        )}
      </div>
    </div >
  )
}
