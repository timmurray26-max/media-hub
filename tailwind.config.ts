import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          bg: "#0b0d10",
          panel: "#12151a",
          card: "#171b22",
          border: "#252b36",
          muted: "#8b95a8",
          text: "#e8ecf4",
          accent: "#F5D000",
          accent2: "#FFB020",
          danger: "#f87171",
          success: "#34d399",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(245, 208, 0, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
