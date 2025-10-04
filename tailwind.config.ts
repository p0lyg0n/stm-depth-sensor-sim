import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f9ff",
          100: "#e6f0ff",
          200: "#bfd6ff",
          300: "#92b8ff",
          400: "#6294ff",
          500: "#3d74f8",
          600: "#2153d6",
          700: "#173ea8",
          800: "#122f7e",
          900: "#0b204f"
        }
      }
    }
  },
  plugins: []
};

export default config;
