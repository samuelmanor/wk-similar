/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      pink: "#ff00aa",
      blue: "#00aaff",
      purple: "#aa00ff",
      green: "#88cc00",
      red: "#ff0033",
      background: "#ededed",
      paper: "#f4f4f4",
      text: "#333333",
    },
    fontFamily: {
      body: ["Noto Sans", "sans-serif"],
      mono: ["Noto Sans JP", "sans-serif"],
    },
    screens: {
      phone: "320px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [require("daisyui")],
};
