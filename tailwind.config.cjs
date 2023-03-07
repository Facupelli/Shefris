/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display SC", "serif"],
        lobster: ["Lobster Two", "cursive"],
      },
      maxWidth: {
        productImg: "250px",
      },
      maxHeight: {
        productImg: "250px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
