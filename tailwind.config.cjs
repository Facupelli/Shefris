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
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fit, minmax(250px, 1fr) )",
      },
    },
  },
  plugins: [],
};

module.exports = config;
