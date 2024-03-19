/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '#1F1341;',
        'color-secondary': '#B6ECD9',
        'color-black': '#000000',
        'color-white': '#ffffff',
        'color-gray_light': '#f6f6f6',
      },
    },
  },
  plugins: [],
}

