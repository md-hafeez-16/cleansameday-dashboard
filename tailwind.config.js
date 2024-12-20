/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Marcellus", "sans-serif"],
    },

    extend: {
      colors: {
        primary: "#650D0C",
      },
    },
  },
  plugins: [],
});
