/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "white-color": "#FFFFFF",
      "grey-color": "#CCCCCC",
      "red-color": "#F80136",
      "black-color": "#111111",
      "green-tag-football": "#00C110",
      "purple-tag-racing": "#8224E3",
      "blue-tag-action": "#2196F3",
      "orange-tag-adventure": "#FF9100",
      "pink-tag-fighter": "#F06594",
      "red-tag-role-playing": "#DD3333",
    },
    extend: {},
  },
  plugins: [daisyui],
};
