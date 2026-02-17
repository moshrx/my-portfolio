/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#1c1c1e", // Apple's dark grey
        primary: "#0071e3",  // Apple Blue
        secondary: "#86868b", // Apple text grey
      },
      borderRadius: {
        '4xl': '40px',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'sans-serif'],
      }
    },
  },
  plugins: [],
}