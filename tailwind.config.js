module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        760: "760px",
        700: "700px",
        600: "600px",
        400: "400px",
        100: "100px",
      },
      maxHeight: {
        1000: "1000px",
        760: "760px",
        700: "700px",
        600: "600px",
        200: "200px",
      },
      height: {
        xxxl: "1200px",
        xxxxl: "1500px",
        750: "750px",
      },
      width: {
        600: "600px",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
