/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A192F", // Deep Navy
        secondary: "#172A45", // Lighter Navy
        accent: "#64FFDA", // Aqua/Mint
        pinky: "#FF64DA", // Pink Highlight
        textMain: "#CCD6F6", // Silver Text
        textDim: "#8892B0", // Muted Blue-Grey
      },
      animation: {
        blob: "blob 7s infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
