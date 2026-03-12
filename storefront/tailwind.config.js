/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        'warm-cream': '#FDF6E3',
        'soft-brown': '#8B6B4E',
        'soft-brown-dark': '#6B4423',
        'pastel-pink': '#FFD1DC',
        'pastel-pink-dark': '#FFB7C5',
        'light-chocolate': '#D4A373',
        'chocolate-dark': '#A67C52',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
