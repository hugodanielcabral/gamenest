/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import gradientMaskImage from "tailwind-gradient-mask-image";
import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
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
    addDynamicIconSelectors(),
  ],
  daisyui: {
    themes: ["dark", "light", "dracula", "nord", "business"],
  },
};
