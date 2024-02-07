/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
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
  // eslint-disable-next-line no-undef
  plugins: [daisyui, require("@tailwindcss/typography")],
  daisyui: {
    themes: ["dark", "light", "dracula", "nord", "business"],
  },
};
