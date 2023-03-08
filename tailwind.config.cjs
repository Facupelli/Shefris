/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display SC", "serif"],
        lobster: ["Lobster Two", "cursive"],
        dosis: ["Dosis", "sans-serif"],
      },
      maxWidth: {
        productImg: "250px",
      },
      maxHeight: {
        productImg: "250px",
      },
      width: {
        card: "300px",
      },
      height: {
        nav: "70px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fit, minmax(300px, 1fr) )",
      },
    },
  },
  plugins: [],
};

module.exports = config;
