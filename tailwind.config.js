/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7b8fcb',
        secondary: '#3a3a3c',
        tertiary: '#525251',
        textPrimary: '#3a3a3c',
        textSecondary: '#8F8F8F',
      },
      fontFamily: {
        sans: ['Raleway', 'sans-serif'], 
        montserrat: ['Montserrat', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
