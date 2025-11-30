/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00eaff",
        secondary: "#8a2cff",
      },
      boxShadow: {
        neon: "0 0 15px rgba(0, 255, 255, 0.6)",
        neonStrong: "0 0 25px rgba(0, 255, 255, 0.9)",
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
        scaleIn: "scaleIn 0.25s ease-out",
        slideDown: "slideDown 0.35s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        }
      }
    },
  },
  plugins: [],
};
