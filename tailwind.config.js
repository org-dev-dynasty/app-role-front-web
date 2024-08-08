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
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },  // Começa fora da tela à direita
          '100%': { transform: 'translateX(0)' },    // Termina na posição normal
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' },      // Começa na posição normal
          '100%': { transform: 'translateX(100%)' }, // Termina fora da tela à direita
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-in-out forwards',  // Animação rápida e suave
        slideOutRight: 'slideOutRight 0.5s ease-in-out forwards', // Animação rápida e suave
      },
    }
  },
  plugins: [],
}

