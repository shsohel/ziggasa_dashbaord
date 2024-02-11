/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#0ec6d5",
        secondary: "#1e1d85",
        success: "#28a745",
        info: "#17a2b8",
        warning: "#f6b500",
        danger: "#dc3545",
        light: "#f8f9fa",
        dark: "#252525",
        mute: "#E9EEF1",
        "txt-mute": "#ababab",
        "mute-200": "#696969",
        // gray: '#696969',
      },
    },
    fontFamily: {
      satisfy: "Satisfy, sans-serif",
      acme: "Acme, cursive",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    // require('tailwindcss-animate'),
    //   require('@tailwindcss/typography'),
    //   require('@tailwindcss/forms'),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
