/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1/8': '12.5%', // Define 1/8 da largura do contêiner pai
      },
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      },
      colors: {
        'white-purple': '#F2E3FC',
        'violet': '#9C4EDC',
        'light-purple': '#5A189A',
        'purple': '#3C096C',
        'dark-purple': '#10002B',
      },
    }
  },
  plugins: [],
}

