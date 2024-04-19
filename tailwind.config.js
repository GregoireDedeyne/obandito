/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'color-primary': '#1F1341;',
        'color-secondary': '#B6ECD9',
        'color-three': '#f43f5e',
        'color-black': '#000000',
        'color-white': '#ffffff',
        'color-gray_light': '#f6f6f6',
        'color-gray_dark': '#212121',
        'color-green-light': '#66BB6A',
        'color-green-dark': '#2E7D32',
        'color-red-light': '#FF5252',
        'color-red-dark': '#C62828',
        'color-yellow-light': '#FFEB3B',
        'color-yellow-dark': '#7E5109',
        // 'text-primary': '#f43f5e',
      },
      backgroundImage: {
        'fond-one': "url('/src/assets/images/fondOne.png')",
        'fond-two': "url('/src/assets/images/fondTwo.png')",
        'fond-three': "url('/src/assets/images/bandPict.jpg')",
      },
      screens: {
        'width-500': '500px',
      },
    },
  },
  plugins: [
    require('daisyui', '@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
