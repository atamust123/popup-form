/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "login-bg": "#C8F0FF",
        "border-1": "#F5F5F5",
      },
      width: {
        "22r": "22rem",
      },
      fontFamily: {
        galano: "Galano Grotesque",
      },
      letterSpacing: {
        "tight-norm": "0.24px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
