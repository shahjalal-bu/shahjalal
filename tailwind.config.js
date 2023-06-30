/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT( {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend:{
      fontFamily:{
        lato: ["var(--font-lato)"],
        grandHotel: ["var(--font-grand-hotel)"],
        luckiest: ["var(--font-luckiest)"]
      }
    }
    // extend: {
    //   fontFamily: {
    //     lato: ["var(--font-lato)"],
    //     grandHotel:["var(--font-grand-hotel)"],
    //     luckiestGuy:["var(--font-luckiest-guy)"]
    //   },
    //   animation: {
    //     loader: "loader 0.6s infinite alternate",
    //   },
    //   keyframes: {
    //     loader: {
    //       to: {
    //         opacity: 0.1,
    //         transform: "translate3d(0, -1rem, 0)",
    //       },
    //     },
    //   },
    // },
  },
  plugins: [],
});
