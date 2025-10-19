/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";


module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sora)', 'Plus Jakarta Sans', 'Arial', 'ui-sans-serif', 'system-ui'],
      code: "var(--font-code)",
      grotesk: "var(--font-grotesk)",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      // NEW ADD
      borderImage: {
        "gradient-conic":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876) 1",
      },
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient":
          "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
        "linear-gradient":
          "linear-gradient(to right, #23EDBC 15%, #B2EDDE 38%, #49ECC5 65%, #0DBF94 100%)",
        "ambient-gradient": "radial-gradient(circle at center, #327363 10%, transparent 90%)",
      },
      borderWidth: {
        DEFAULT: "0.0525rem",
      },
      // NEW ADD

      blur: {
        "ambient": '175px',
        "ambient-hard": '10px',
      },

      colors: {
        // NEW ADD
        color: {
          1: "#FF004D", // Neon Red - pencahayaan belakang hero
          2: "#00FFD1", // Teal Glow - highlight wajah dan elemen UI
          3: "#00FF85", // Electric Green - tombol dan teks utama
          4: "#FF98E2", // Soft Pink - aksen feminin dan modern
          5: "#858DFF", // Muted Purple - hover, badge, atau link
          6: "#FFC876", // Warm Yellow - alternatif highlight atau notifikasi
        },
        stroke: {
          1: "#26242C",
        },
        n: {
          1: "#FBF6EE", // Teks utama
          2: "#D0E2DE", // Teks kedua
          3: "#C3E2D7", // Placeholder atau teks pasif
          4: "#757185", // Label atau teks navigasi
          5: "#3F3A52", // Border atau elemen UI
          6: "#0C1316", // Background section
          7: "#15131D", // Background utama
          8: "#0A0A0A", // Base background (gelap pekat)
          9: "#474060", // Card atau container
          10: "#43435C", // Sidebar atau navigasi
          11: "#1B1B2E", // Footer atau elemen bawah
          12: "#2E2A41", // Panel atau modal
          13: "#6C7275", // Teks deskriptif atau caption
        },

        // NEW ADD
        primaryColor: "#0B1014",
        secondaryColor: "#10171A",
        altprimaryColor: "#10171A",
        borderShade: "#27272a",
        accentColor: "#08baa5",
        accentColor2: "#49c5c1",
        accentColor3: "#2a9895",
        accentHoverColor3: "#258381",
        fontPrimaryColor: "#fbf6ee",
      },
      keyframes: {
        loop: {
          "0%": { transform: "translate3d(50%, 0%, 0) rotate(0deg)" },
          "5%": { transform: "translate3d(57%, -6%, 0) rotate(15deg)" },
          "10%": { transform: "translate3d(43%, 5%, 0) rotate(30deg)" },
          "15%": { transform: "translate3d(60%, -4%, 0) rotate(45deg)" },
          "20%": { transform: "translate3d(40%, 6%, 0) rotate(60deg)" },
          "25%": { transform: "translate3d(55%, 0%, 0) rotate(75deg)" },
          "30%": { transform: "translate3d(45%, -7%, 0) rotate(90deg)" },
          "35%": { transform: "translate3d(53%, 4%, 0) rotate(105deg)" },
          "40%": { transform: "translate3d(48%, -5%, 0) rotate(120deg)" },
          "45%": { transform: "translate3d(56%, 6%, 0) rotate(135deg)" },
          "50%": { transform: "translate3d(50%, 0%, 0) rotate(150deg)" },
          "55%": { transform: "translate3d(44%, 5%, 0) rotate(165deg)" },
          "60%": { transform: "translate3d(53%, -6%, 0) rotate(180deg)" },
          "65%": { transform: "translate3d(47%, 4%, 0) rotate(195deg)" },
          "70%": { transform: "translate3d(61%, -7%, 0) rotate(210deg)" },
          "75%": { transform: "translate3d(39%, 0%, 0) rotate(225deg)" },
          "80%": { transform: "translate3d(55%, 7%, 0) rotate(240deg)" },
          "85%": { transform: "translate3d(48%, -5%, 0) rotate(255deg)" },
          "90%": { transform: "translate3d(52%, 6%, 0) rotate(270deg)" },
          "95%": { transform: "translate3d(49%, -3%, 0) rotate(288deg)" },
          "100%": { transform: "translate3d(50%, 0%, 0) rotate(306deg)" },
        },
      },

      animation: {
        loop: "loop var(--speed) linear infinite",
      },

      zIndex: {
        DEFAULT: "1",
        '5': '5',
        '4': '4',
        '3': '3',
        '2': '2',
        '1': '1',
        '-1': '-1',
      },

    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        // ".container": {
        //   "@apply max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]":
        //     {},
        // },
        ".h1": {
          "@apply font-semibold text-[2.0rem] leading-[3.0rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[1.725rem] leading-normal md:text-[1.875rem]": {},
        },
        ".h4": {
          "@apply text-[1.675rem] leading-relaxed": {},
        },
        ".h5": {
          "@apply text-xl leading-relaxed": {},
        },
        ".h6": {
          "@apply font-medium text-lg leading-8": {},
        },
        ".header-1": {
          "@apply font-thin text-[0.875rem] leading-7 md:text-[1.05rem] tracking-wide": {},
        },
        // ".body-1": {
        //   "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
        //     {},
        // },
        // ".body-2": {
        //   "@apply font-light text-[0.875rem] leading-6 md:text-[1.05rem] tracking-wide": {},
        // },

        ".body-1": {
          "@apply text-[0.925rem] leading-[1.5rem] md:text-[1.05rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-light text-[0.775rem] leading-6 md:text-[0.925rem] lg:text-[0.975rem] lg:leading-7 tracking-wide": {},
        },
        ".body-3": {
          "@apply font-thin text-[0.675rem] leading-6 md:text-[0.775rem] tracking-wider": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-light text-sm capitalize":
            {},
        },
        ".quote": {
          "@apply font-grotesk text-base leading-snug tracking-wide": {},
        },
        ".navigation": {
          "@apply text-[0.625rem] md:text-[0.725rem] lg:text-[0.775rem] leading-normal":
            {},
        },
        ".sub-navigation": {
          "@apply text-[0.575rem] md:text-[0.675rem] lg:text-[0.725rem] font-thin leading-normal":
            {},
        },
        ".button": {
          "@apply z-10 text-[0.625rem] md:text-[0.725rem] lg:text-[0.775rem] font-semibold uppercase tracking-[0.075em]": {},
        },
        // ".button": {
        //   "@apply z-10 text-xs font-semibold uppercase tracking-[0.075em]": {},
        // },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
      });
    }),
  ],
}
