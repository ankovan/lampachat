import { divider } from "@nextui-org/react";
import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  // plugins: [nextui()],
  plugins: [
    nextui({
      themes: {
        "default": {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
              "default-200": "#3e3221",
              "default-400": "#3e3221",
              background: "#1C1612",
              foreground: "#fff5e0",
              secondary: "#fa7e68",
              divider: "#ffcc7a",
              content1: "#231E1B",
              primary: "#ffcc7a",
              focus: "#c84630",
          },
          layout: {
          }
        },
      },
    }),
    require('tailwind-scrollbar'),
  ],
};
export default config;
