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
        "mobile-img": "250px",
        "desktop-img": "210px",
      },
      height: {
        nav: "70px",
        "mobile-img": "250px",
        "desktop-img": "210px",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat( auto-fit, minmax(300px, 1fr) )",
      },
      keyframes: {
        shake: {
          "0%": { transform: "rotateZ(20deg)" },
          "25%": { transform: "rotateZ(-20deg)" },
          "50%": { transform: "rotateZ(15deg)" },
          "75%": { transform: "rotateZ(-15deg)" },
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
