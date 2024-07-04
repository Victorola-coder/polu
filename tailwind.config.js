/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    keyframes: {
      "fade-effect": {
        "0%": {
          transform: "scale(0.9)",
          opacity: "0",
        },
        "100%": {
          transform: "scale(1)",
          opacity: "1",
        },
      },

      "slide-up": {
        "0%": {
          transform: "translateY(100%)",
          opacity: "0",
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
      "slide-down": {
        "0%": {
          transform: "translateY(-100%)",
          opacity: "0",
        },
        "100%": {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
      loader: {
        "0%": {
          opacity: "0.2",
        },
        "100%": {
          opacity: "1",
        },
      },
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "fade-in": "fade-effect 300ms linear",
      "slide-down": "slide-down 300ms linear forwards",
      "slide-up": "slide-up 300ms linear forwards",
      "rotate-clockwise": "rotate-clockwise 1s infinite linear",
      "loader-opacity": "loader 1s ease-in-out alternate infinite",

      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    fontFamily: {
      kelp: ["Kelpo", "sans-serif"],
      jar: ["Plus Jakarta Sans", "sans-serif"],
    },
  },
};
export const plugins = ["tailwindcss-animate"];
