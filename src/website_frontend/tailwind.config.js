/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'Arial', 'ui-sans-serif', 'system-ui'],
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
      colors: {
        primaryColor: "#10151e",
        secondaryColor: "#161b24",
        borderShade: "#3a3e45",
        altprimaryColor: "#020408 ",
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

    },
  },
  plugins: [],
}
