/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#262254',
        'secondary' : '#543884',
        'error' : '#FF0000' 
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}