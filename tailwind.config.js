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
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
