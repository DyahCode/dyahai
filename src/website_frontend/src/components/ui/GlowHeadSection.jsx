import React from "react";

const ballsConfig = [
  { delay: "0s", size: 0.4, speed: "20s" },
  { delay: "-12s", size: 0.35, speed: "25s" },
  { delay: "-10s", size: 0.3, speed: "15s" },
];

export default function GlowSection() {
  return (
    <div className="glow-container absolute -z-10 w-full h-full opacity-10 translate-y-[25%]">
      {ballsConfig.map((ball, index) => (
        <div
          key={index}
          className="ball absolute rounded-full opacity-60 animate-loop"
          style={{
            "--delay": ball.delay,
            "--size": ball.size,
            "--speed": ball.speed,
            width: `calc(150% * ${ball.size})`,
            aspectRatio: "1 / 2",
            background: "linear-gradient(259.53deg, #08baa5 6.53%, #00ffd5 95.34%)",
            filter: "blur(10vw)",
            animationDuration: ball.speed,
            animationDelay: ball.delay,
            transformOrigin: "50% 50%",
          }}
        ></div>
      ))}
    </div>
  );
}
