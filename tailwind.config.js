/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'darkCharcoal': '#2C2C2E',
        'lightGray': '#E0E0E0',
        'brightAmber': '#FFB300',
        'almostBlack': '#1C1C1E',
        'brightAmberHover': '#FFD600',
        'brightAmberDark': '#D89A00',
        'btnColor':'oklch(49.12% 0.3096 275.75 /1)',
        'customColor': 'oklch(32.1785% 0.02476 255.701624 / 1)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [require('daisyui')],
}