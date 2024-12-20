import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '13': '3.25rem',
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite', // Lasts 1.5 seconds
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg) translateX(0) scale(1.05)' }, // Start and end at -5 degrees
          '25%': { transform: 'rotate(5deg) translateX(2px) scale(1.1)' }, // Rotate + outward
          '50%': { transform: 'rotate(-5deg) translateX(-2px) scale(1.05)' }, // Rotate back + inward
          '75%': { transform: 'rotate(5deg) translateX(2px) scale(1)' }, // Rotate again + outward
        },
      }
    },
  },
  plugins: [],
};

export default config;

