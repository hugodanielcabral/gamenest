/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import gradientMaskImage from "tailwind-gradient-mask-image";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      variants: {
        extend: {
          opacity: ["disabled"],
          cursor: ["disabled"],
        },
      },
    },
  },
  plugins: [
    daisyui,
    // eslint-disable-next-line no-undef
    require("@tailwindcss/typography"),
    gradientMaskImage,
  ],
  daisyui: {
    themes: ["dark", "light", "dracula", "nord", "business"],
  },
};
