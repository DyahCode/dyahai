import React from "react";

export const Container = ({ children, className = "" }) => {
  return (
    <div className={`container w-full h-full ${className}`}>
      {children}
    </div>
  );
};

export const ClearBox = ({ children, className = "", g = true, gStyle = '' }) => {
  return (
    <div
      className={`${className} flex flex-col items-center backdrop-blur-2xl
        relative overflow-visible transition-all duration-200 group`}
    >
      {g && <div className={`z-0 absolute select-none pointer-events-none ${gStyle ? gStyle : "-bottom-[150px] hover:-bottom-[100px] w-full h-[16rem]"} bg-ambient-gradient blur-ambient opacity-75`} />}
      <div className="relative z-1">
        {children}
      </div>
    </div>
  );
};



export const Box = ({ children, className = "", cursorHover = false, padding = false, g = false, gStyle = "" }) => {
  return (
    <div
      className={`${className} bg-[#0B1114]/50 flex flex-col border border-t-2 border-t-n-1/10 backdrop-blur-2xl
        ${cursorHover ? "border-n-1/5 hover:border-n-1/10 " : "border-n-1/10 "} ${padding ? "p-4 md:p-10 xl:p-16" : "p-0"}
        relative overflow-hidden transition-all duration-200 group`}
    >
      {g && <div className={`z-0 absolute select-none pointer-events-none ${gStyle ? gStyle : "-bottom-[200px] w-full h-80"} bg-ambient-gradient blur-ambient opacity-100`} />}

      {/* {g2 && <div className={`z-0 absolute ${g2Style} bg-ambient-gradient blur-ambient opacity-75`} />} */}
      <div className="relative z-1">
        {children}
      </div>
    </div>
  );
};

export const BackdropBox = ({ children, className = "", cursorHover = false, g1 = false, g1Style = '', g2 = false, g2Style = '' }) => {
  return (
    // hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex ${padding ? "p-2" : "p-4 md:p-10 xl:p-16"}
    <div
      className={`${className} bg-[#0B1114]/75 rounded-2xl border border-t-2 border-t-n-1/10
      ${cursorHover ? "border-n-1/5 hover:border-n-1/10 " : "border-n-1/10 "} 
        relative overflow-hidden transition-all duration-200 group`}
    >
      {g1 && <div className={`z-0 absolute select-none pointer-events-none ${g1Style ? g1Style : "-top-[200px] w-full h-60"} bg-ambient-gradient blur-ambient opacity-75`} />}

      {g2 && <div className={`z-0 absolute select-none pointer-events-none ${g2Style} bg-ambient-gradient blur-ambient opacity-75`} />}

      <div className="relative z-1">
        {children}
      </div>
    </div>
  );
};

const ContainerBox = ({ children, containerClass = "", boxClass = "", cursorHover = false, padding = false, g = false, gStyle = "" }) => {
  return (
    <Container className={containerClass}>
      <Box className={boxClass} cursorHover={cursorHover} padding={padding} g={g} gStyle={gStyle}
      >
        {children}
      </Box>
    </Container>
  );
};

export default ContainerBox;


