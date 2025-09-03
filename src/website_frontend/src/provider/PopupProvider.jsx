import React from 'react'
import Button from '../components/ui/Button';
import { v4 as uuidv4 } from 'uuid';

const PlugWalletLogo = "https://bafybeid3aty76qvbd7lgs2xqfozscqncbfl64rzwtuyuaa6s2bmofqiaie.ipfs.w3s.link/plug-wallet-logo.png";

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
 */

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = React.useState([]);

  /**
   * @param {PopupOptions & {progress?: number}} param0
   */

  const showPopup = ({ title, message, type = "default", leftLabel = "OK", onLeft, rightLabel, onRight, progress = 0, extend = null, extendMessage = [], }) => {
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
      progress,
      extend,
      extendMessage,
    }]);
  };

  const hidePopup = (id) => {
    if (id) {
      setPopups(prev => prev.filter(p => p.id !== id));
    } else {
      setPopups([]);
    }
  };

  const gradientBackground = {
    default: "bg-[radial-gradient(ellipse_at_right_top,_#0c4a6e_0%,_#151419_47%,_#151419_100%)]",
    loading: "bg-[radial-gradient(ellipse_at_right_top,_#0c4a6e_0%,_#151419_47%,_#151419_100%)]",
    success: "bg-[radial-gradient(ellipse_at_right_top,_#107667ed_0%,_#151419_47%,_#151419_100%)]",
    warning: "bg-[radial-gradient(ellipse_at_right_top,_#b69418_0%,_#151419_47%,_#151419_100%)]",
    error: "bg-[radial-gradient(ellipse_at_right_top,_#a63d2a82_0%,_#151419_47%,_#151419_100%)]",
  };

  const buttonAccent = {
    default: "hover:bg-sky-500",
    loading: "hover:bg-sky-500",
    success: "hover:bg-emerald-500",
    warning: "hover:bg-yellow-400",
    error: "hover:bg-red-500",
  }

  const typeIcons = {
    default: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-neutral-300 w-10 h-10">
        <path fill="currentColor" d="M6.433 2.4c1.402-.15 3.203-.15 5.52-.15h.094c2.317 0 4.118 0 5.52.15c1.418.153 2.541.47 3.437 1.186c.92.736 1.35 1.693 1.553 2.9c.193 1.152.193 2.618.193 4.446v.183c0 1.782 0 3.015-.2 3.934a3.7 3.7 0 0 1-.545 1.323c-.264.392-.6.722-1 1.042c-.897.717-2.02 1.033-3.438 1.185c-1.402.151-3.203.151-5.52.151H12c-1.056 0-1.863.357-2.707.906c-.342.221-.675.464-1.036.729l-.304.22c-.475.345-.994.71-1.58 1.046A.75.75 0 0 1 5.25 21v-2.585c-.879-.19-1.623-.496-2.254-1c-.4-.321-.737-.65-1-1.043a3.7 3.7 0 0 1-.546-1.323c-.2-.919-.2-2.152-.2-3.934v-.183c0-1.828 0-3.294.193-4.445c.203-1.208.633-2.165 1.553-2.901c.896-.717 2.019-1.033 3.437-1.185m2.317 8.1a.75.75 0 0 0-1.5 0v.5a.75.75 0 0 0 1.5 0zm4 0a.75.75 0 0 0-1.5 0v.5a.75.75 0 0 0 1.5 0zm4 0a.75.75 0 0 0-1.5 0v.5a.75.75 0 0 0 1.5 0z" />
      </svg>
    ),
    success: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-emerald-500 w-10 h-10">
        <path fill="currentColor" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12m13.523-3.308a.75.75 0 0 0-1.048.169l-3.597 4.981a.25.25 0 0 1-.391.018l-1.506-1.72a.75.75 0 1 0-1.129.987l1.506 1.721a1.75 1.75 0 0 0 2.736-.128l3.597-4.98a.75.75 0 0 0-.168-1.048" />
      </svg>
    ),
    warning: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-yellow-400 w-10 h-10">
        <path fill="currentColor" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m0 4.627a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5a.75.75 0 0 1 .75-.75m.75 8.996v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 1.5 0" />
      </svg>
    ),
    error: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="text-red-500 w-10 h-10">
        <path fill="currentColor" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m-4.47 5.22a.75.75 0 0 1 1.06 0L12 10.94l3.41-3.41a.75.75 0 0 1 1.06 1.06L13.06 12l3.41 3.41a.75.75 0 0 1-1.06 1.06L12 13.06l-3.41 3.41a.75.75 0 0 1-1.06-1.06L10.94 12 7.53 8.59a.75.75 0 0 1 0-1.06" />
      </svg>
    ),
    loading: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='text-sky-500 w-10 h-10'>
        <path fill="currentColor" d="M10.565 2.075c-.394.189-.755.497-1.26.928l-.079.066a2.56 2.56 0 0 1-1.58.655l-.102.008c-.662.053-1.135.09-1.547.236a3.33 3.33 0 0 0-2.03 2.029c-.145.412-.182.885-.235 1.547l-.008.102a2.56 2.56 0 0 1-.655 1.58l-.066.078c-.431.506-.74.867-.928 1.261a3.33 3.33 0 0 0 0 2.87c.189.394.497.755.928 1.26l.066.079c.41.48.604.939.655 1.58l.008.102c.053.662.09 1.135.236 1.547a3.33 3.33 0 0 0 2.029 2.03c.412.145.885.182 1.547.235l.102.008c.629.05 1.09.238 1.58.655l.079.066c.505.431.866.74 1.26.928a3.33 3.33 0 0 0 2.87 0c.394-.189.755-.497 1.26-.928l.079-.066c.48-.41.939-.604 1.58-.655l.102-.008c.662-.053 1.135-.09 1.547-.236a3.33 3.33 0 0 0 2.03-2.029c.145-.412.182-.885.235-1.547l.008-.102c.05-.629.238-1.09.655-1.58l.066-.079c.431-.505.74-.866.928-1.26a3.33 3.33 0 0 0 0-2.87c-.189-.394-.497-.755-.928-1.26l-.066-.079a2.56 2.56 0 0 1-.655-1.58l-.008-.102c-.053-.662-.09-1.135-.236-1.547a3.33 3.33 0 0 0-2.029-2.03c-.412-.145-.885-.182-1.547-.235l-.102-.008a2.56 2.56 0 0 1-1.58-.655l-.079-.066c-.505-.431-.866-.74-1.26-.928a3.33 3.33 0 0 0-2.87 0m.905 4.895a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 1 1-1.06 1.06l-2.22-2.22v7.19a.75.75 0 0 1-1.5 0V9.31l-2.22 2.22a.75.75 0 0 1-1.06-1.06z" />
      </svg>
    )
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
                if (popupData.type == "loading" && popupData.onLeft) popupData.onLeft();
                hidePopup(popupData.id);
              }}
                className='p-1 rounded-full aspect-square bg-transparent group hover:bg-neutral-800/10'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className="w-6 cursor-pointer text-white/50 group-hover:text-white/80 stroke-[2px] fill-none">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* gradient */}
            <div className={`w-full h-full absolute -z-0 ${gradientBackground[popupData.type]}
            `}></div>

            {/* content */}
            <div className='w-full h-full flex flex-col relative p-8'>
              <div className="w-full text-left flex flex-col sm:flex-row sm:items-end sm:text-left">

                {/* icon */}
                <div className='flex place-content-center items-center justify-center h-full w-12 sm:w-16'>

                  {typeIcons[popupData.type]}
                </div>

                {/* text */}
                <div className="sm:ml-8 space-y-2">
                  <span className="text-left text-white text-lg tracking-[0.035em] mt-2.5 mb-4 font-semibold">
                    {popupData.title}
                  </span>
                  <p className="text-left text-[#cccccc] text-base tracking-[0.031rem]">
                    {popupData.message}
                  </p>

                  {/* extend content */}

                  {/* plug wallet required */}
                  {popupData.extend === "plugInstruction" && (
                    <div className='w-full flex flex-col space-y-2 pt-2'>
                      <span className='text-left text-[#aaaaaa] text-xs tracking-[0.031rem]'>Continue to Install Plug Wallet Extension from below</span>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          window.open(
                            "https://chromewebstore.google.com/detail/plug/cfbfdhimifdmdehjmkdobpcjfefblkjm?pli=1",
                            "_blank"
                          );
                        }}
                        className="hover:bg-accentColor hover:border-accentColor">
                        <img src={PlugWalletLogo}
                          className='size-6'
                          alt=""
                          loading="lazy" />

                        <span className='text-sm'>
                          Install Extension from Chrome Web Store
                        </span>
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
                  {popupData.extend === "message" && popupData.extendMessage.length > 0 && (
                    <div className="w-full flex flex-col space-y-1 pt-3">
                      {popupData.extendMessage.map((msg, idx) => (
                        <span
                          key={idx}
                          className="text-left text-[#aaaaaa] text-xs tracking-[0.031rem]"
                        >
                          {msg.error ? `Error: ${msg.error}` : ""}
                          {msg.serverMessage ? ` - ${msg.serverMessage}` : ""}
                        </span>
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
            </div>
          </div>
        </section>
      ))}
    </PopupContext.Provider>
  );
}