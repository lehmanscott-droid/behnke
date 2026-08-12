/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Industrial Heritage palette
        charcoal: {
          DEFAULT: "#26231f",
          deep: "#1a1815",
          soft: "#332e28",
          line: "#413b34",
        },
        brick: {
          DEFAULT: "#a83c2b",
          dark: "#8a2f20",
          light: "#c25a48",
        },
        offwhite: {
          DEFAULT: "#f6f2ea",
          paper: "#fbf9f4",
          dim: "#ece6da",
        },
        forest: {
          DEFAULT: "#2f5d4a",
          light: "#3d7360",
        },
        amber: {
          signal: "#c98a2b",
        },
      },
      fontFamily: {
        heading: [
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "46rem",
      },
      keyframes: {
        "signal-pulse": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
            boxShadow: "0 0 0 0 var(--signal-color)",
          },
          "50%": {
            opacity: "0.55",
            transform: "scale(0.9)",
            boxShadow: "0 0 0 8px transparent",
          },
        },
        "slide-down": {
          from: { transform: "translateY(-100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "signal-pulse": "signal-pulse 1.6s ease-in-out infinite",
        "slide-down": "slide-down 0.35s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
