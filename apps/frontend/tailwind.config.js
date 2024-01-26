/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white_color: "#FFFFFF",
      grey_color: "#CCCCCC",
      red_color: "#F80136",
      black_color: "#111111",
      green_tag_football: "#00C110",
      purple_tag_racing: "#8224E3",
      blue_tag_action: "#2196F3",
      orange_tag_adventure: "#FF9100",
      pink_tag_fighter: "#F06594",
      red_tag_role_playing: "#DD3333",
    },
    extend: {},
  },
  plugins: [daisyui],
};
