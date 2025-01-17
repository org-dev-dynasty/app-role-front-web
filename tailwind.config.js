/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '1/8': '12.5%' // Define 1/8 da largura do contêiner pai
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        chillax: ['Chillax', 'sans-serif'],
        satoshi: ['Satoshi', 'cursive']
      },
      colors: {
        'white-purple': '#F2E3FC',
        violet: '#9C4EDC',
        'light-purple': '#5A189A',
        purple: '#3C096C',
        'dark-purple': '#10002B',
        grayModal: '#383838',
        grayInputModal: '#616161'
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)' }, // Começa fora da tela à direita
          '100%': { transform: 'translateX(0)' } // Termina na posição normal
        },
        slideOutRight: {
          '0%': { transform: 'translateX(0)' }, // Começa na posição normal
          '100%': { transform: 'translateX(100%)' } // Termina fora da tela à direita
        },
        slideandSpinInfiniteRightToLeft: {
          '0%': {
            transform: 'translateX(100vw) rotate(0deg)' // Começa fora da tela à direita
          },
          '100%': {
            transform: 'translateX(-100vw) rotate(360deg)' // Termina fora da tela à esquerda
          }
        },
        carrouselSlider: {
          '0%': {
            transform: 'translateX(0)' // Começa na posição normal
          },
          '100%': {
            transform: 'translateX(-100%)' // Termina fora da tela à esquerda
          }
        },
        floatMockup: {
          '0%': {
            transform: 'translateY(0)' // Começa na posição normal
          },
          '50%': {
            transform: 'translateY(-5%)' // Flutua para cima
          },
          '100%': {
            transform: 'translateY(0)' // Retorna à posição normal
          }
        },
        floatEmojisLeft: {
          '0%': {
            transform: 'translateY(0)' // Começa na posição normal
          },
          '50%': {
            transform: 'translateY(-30%)' // Flutua para cima
          },
          '100%': {
            transform: 'translateY(0)' // Retorna à posição normal
          }
        },
        floatingEmojisRight: {
          '0%': {
            transform: 'translateY(0)' // Começa na posição normal
          },
          '50%': {
            transform: 'translateY(-50%)' // Flutua para cima
          },
          '100%': {
            transform: 'translateY(0)' // Retorna à posição normal
          }
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)'
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
        }
      },
      animation: {
        slideInRight: 'slideInRight 0.5s ease-in-out forwards', // Animação rápida e suave
        slideOutRight: 'slideOutRight 0.5s ease-in-out forwards', // Animação rápida e suave
        infiniteSpin: 'infiniteSpin 30s linear infinite', // Animação contínua e suave
        slideandSpinInfiniteRightToLeft:
          'slideandSpinInfiniteRightToLeft 24s linear infinite', // Animação contínua e suave
        carrouselSlider: 'carrouselSlider 5000ms linear initial backwards', // Animação contín
        floatMockup: 'floatMockup 6s ease-in-out infinite', // Animação contín
        floatEmojisLeft: 'floatEmojisLeft 3s ease-in-out infinite', // Animação contín
        floatingEmojisRight: 'floatingEmojisRight 5s ease-in-out infinite', // An
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)', // Modal
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)' // Modal
      },
      boxShadow: {
        bubbleShadow: '0 0 40px 30px rgba(255, 255, 255, 0.5)' // Sombra suave
      }
    }
  },
  plugins: []
}
