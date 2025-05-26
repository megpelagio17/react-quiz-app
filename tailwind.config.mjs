/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: '#F2FAFE',
        border: '#CDE5FB',
        textColor: '#4C96F3',
        buttonBg: '#FDFBFC'
      }
    }
  },
  plugins: []
}
