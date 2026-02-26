/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FDF7F0",
        foreground: "#1a1a1a",
        primary: "#6A0DAD",
        secondary: "#D4AF37",
      },
    },
  },
  plugins: [],
};
