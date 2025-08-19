import React, { useEffect } from "react";
import Button from "../ui/Button";

const CardNotification = ({
  title = "Notification",
  message = "",
  description = "",
  onClose,
  actionLabel = "Take Action",
  actionUrl,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes bounceIn {
            0% {
              transform: scale(0.8);
              opacity: 0;
            }
            60% {
              transform: scale(1.1);
              opacity: 1;
            }
            80% {
              transform: scale(0.9);
            }
            100% {
              transform: scale(1);
            }
          }
        `}
      </style>

      <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-primaryColor/80  z-50 text-white p-8">
        <div
          className="flex flex-col h-[400px] w-[700px] bg-primaryColor  rounded-2xl border-2 border-borderShade overflow-auto"
          style={{
            animation: "bounceIn 0.3s ease-out forwards",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-primaryColor h-[20%] px-4 ">
            <h2 className="font-semibold text-xl text-accentColor">{title}</h2>
            <button className="h-[36px] w-[36px] rounded-lg" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="w-full h-[60%] bg-grid bg-center flex justify-center items-center flex-col px-6 border-y-2 border-borderShade">
            <span className="font-bold text-2xl text-accentColor">
              {message}
            </span>
            <p className="font-light text-md text-white text-center mt-3">
              {description}
            </p>
          </div>

          {/* Footer */}
          <div className="w-full h-[20%]  p-4 gap-4 flex justify-center items-center ">
            <Button
              rel="noopener noreferrer"
              onClick={actionUrl}
              className="w-full bg-accentColor text-black font-semibold  transition-all"
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardNotification;


