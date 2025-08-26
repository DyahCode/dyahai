import React from "react";

export const Container = ({ children, className = "" }) => {
  return (
    <div className={`container w-full h-full ${className}`}>
      {children}
    </div>
  );
};

export const Box = ({ children, className = "", cursorHover = false, padding = false }) => {
  return (
    <div
      className={`flex flex-col rounded-2xl items-center transition duration-200 border border-t-2 border-t-neutral-500/20
        ${cursorHover ? "border-neutral-500/10 hover:border-neutral-500/20 " : "border-neutral-500/20 "} ${padding ? "p-2" : "p-4 md:p-10 xl:p-16"} bg-gradient-to-b from-[#121720] via-[#11161f] to-[#10151e] group ${className}`}
    >
      {children}
    </div>
  );
};

const ContainerBox = ({ children, containerClass = "", boxClass = "", cursorHover = false, padding = false }) => {
  return (
    <Container className={containerClass}>
      <Box className={boxClass} cursorHover={cursorHover} padding={padding}>
        {children}
      </Box>
    </Container>
  );
};

export default ContainerBox;


