import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172337",
        flipblue: "#2874f0",
        sunshine: "#ffe500"
      },
      boxShadow: {
        card: "0 2px 12px rgba(23, 35, 55, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
