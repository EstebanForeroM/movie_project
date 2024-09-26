import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {  
        primary: {
          DEFAULT: '#ff79c6', // Light Pink
          dark: '#ff4b9f',    // Slightly Darker Pink
        },
        accent: {
          DEFAULT: '#ff92df', // Soft Pink
          dark: '#d16db5',    // Muted, deeper pink for dark mode
        },
        focus: {
          DEFAULT: '#ff69b4', // Hot Pink for focus states
          hover: '#ff85c0',   // Hover state variation
        },
        background: {
          DEFAULT: '#0a0a0a', // Dark Navy Background
          secondary: '#2d2d44', // Lighter Secondary Background
          surface: '#232336',  // Surface color (card-like elements)
        },
        text: {
          primary: '#ffffff', // White for text
          secondary: '#d1d1e9', // Lighter gray for secondary text
        },
        border: {
          DEFAULT: '#ff92df', // Soft pink for borders
          focus: '#ff69b4',  // Pink for border focus states
        },
      },
    },
  },
  plugins: [],
};
export default config;
