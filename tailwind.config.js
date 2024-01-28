/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ReactNativeApp.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7F1BC4',
        'splash-link': '#9771E8',
        'public-page-title': '#2D3748',
        'public-page-subtitle': '#8391A1',
      },
      fontFamily: {
        'poppins-bold': ['Poppins-Bold'],
        'poppins-extra-bold': ['Poppins-ExtraBold'],
        'poppins-light': ['Poppins-Light'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-normal': ['Poppins-Normal'],
        'poppins-semi-bold': ['Poppins-SemiBold'],
      },
    },
  },
  plugins: [],
};
