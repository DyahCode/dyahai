import React from "react";

const Button = ({ children, onClick, type = 'primary', withIcon = false, centering = false, className }) => {
  const glowRef = React.useRef(null);
  const [clicked, setClicked] = React.useState(false);


  const handleMouseMove = (e) => {
    if (clicked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (glowRef.current) {
      glowRef.current.style.left = `${x}px`;
      glowRef.current.style.top = `${y}px`;
    }
  };

  const handleMouseEnter = () => {
    if (clicked) return;
    if (glowRef.current) {
      glowRef.current.style.transform = "translate(-50%, -50%) scale(1.15)";
    }
  };

  const handleMouseLeave = () => {
    if (clicked) return;
    if (glowRef.current) {
      glowRef.current.style.transform = "translate(-50%, -50%) scale(0)";
    }
  };

  const handleClick = (e) => {
    setClicked(true);
    onClick?.(e);
    setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.transform = "translate(-50%, -50%) scale(0)";
        glowRef.current.style.left = "50%";
        glowRef.current.style.top = "50%";
      }
    }, 300);
    setTimeout(() => {
      setClicked(false);
    }, 1700);
  };

  const borderVariantClassName = {
    secondary: "bg-borderShade py-[1.5px] px-[2px]",
    primary: "bg-linear-gradient py-[1.5px] px-[2px]",
    outline: "bg-borderShade py-[1px] px-[1px]",
  }

  const innerPaddingVariantClassName = {
    primary: "px-6 py-2.5",
    secondary: "px-6 py-2.5",
    outline: "px-4 py-2"
  }


  return (
    <button
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`
        cursor-pointer relative inline-block rounded-lg outline-none overflow-hidden transition-all duration-300 group
        ${borderVariantClassName[type]}
        `}
    >
      <div className={`h-fit text-n-1 group-hover:text-[#00ffc3] bg-secondaryColor rounded-lg
      ${clicked ? "group-hover:text-n-1" : "group-hover:text-[#00ffc3]"}
      ${innerPaddingVariantClassName[type]}
      `}>
        {/* content */}
        {type === "outline" ? (
          <div className={`w-full items-center relative z-5 button flex space-x-2
          ${centering ? "justify-center" : ""}`}>
            {children}
          </div>
        ) : withIcon ? (
          <div className={`w-full items-center relative z-5 button flex space-x-2
          ${centering ? "justify-center" : ""}`}>
            {children}
          </div>
        ) : (
          <span className="relative z-5 button font-semibold">{children}</span>
        )}

        {/* Glow effect */}
        <span
          ref={glowRef}
          className="z-0 absolute pointer-events-none rounded-full opacity-50 scale-0 transition-all duration-500 ease-out"
          style={{
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, #00ffc3 10%, transparent 70%)",
            transform: "translate(-50%, -50%) scale(0)",
          }}
        />

        {/* fill effect */}
        <span
          className="z-1 absolute pointer-events-none rounded-full transition-all duration-500 ease-out"
          style={{
            width: clicked ? "500px" : "25px",
            height: clicked ? "500px" : "25px",
            background: clicked ? "#22A888" : "transparent",
            transform: clicked ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0)",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
    </button >
  );
};

export default Button;
