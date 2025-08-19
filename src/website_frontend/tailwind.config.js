/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      Jakarta: ["Plus Jakarta Sans", "sans-serif"],
      gap: "4rem",
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
      
    },
  },
  plugins: [],
}
