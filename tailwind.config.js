import { transform } from 'typescript';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		spacing: {
  			'1/8': '12.5%'
  		},
  		fontFamily: {
  			nunito: [
  				'Nunito',
  				'sans-serif'
  			],
  			chillax: [
  				'Chillax',
  				'sans-serif'
  			],
  			satoshi: [
  				'Satoshi',
  				'cursive'
  			]
  		},
  		colors: {
  			'white-purple': '#F2E3FC',
  			violet: '#9C4EDC',
  			'light-purple': '#5A189A',
  			purple: '#3C096C',
  			'dark-purple': '#10002B',
  			grayModal: '#383838',
  			grayInputModal: '#616161',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
			keyframes: {
				'loader-dot': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-100%)' },
        },
  			slideInRight: {
  				'0%': {
  					transform: 'translateX(100%)'
  				},
  				'100%': {
  					transform: 'translateX(0)'
  				}
  			},
  			slideOutRight: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			slideandSpinInfiniteRightToLeft: {
  				'0%': {
  					transform: 'translateX(100vw) rotate(0deg)'
  				},
  				'100%': {
  					transform: 'translateX(-100vw) rotate(360deg)'
  				}
  			},
  			carrouselSlider: {
  				'0%': {
  					transform: 'translateX(0)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			floatMockup: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-5%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			floatEmojisLeft: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-30%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			floatingEmojisRight: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-50%)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			overlayShow: {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			contentShow: {
  				from: {
  					opacity: '0',
  					transform: 'translate(-50%, -48%) scale(0.96)'
  				},
  				to: {
  					opacity: '1',
  					transform: 'translate(-50%, -50%) scale(1)'
  				}
  			}
  		},
			animation: {
				'loader-dot': 'loader-dot 1s infinite ease-in-out',
  			slideInRight: 'slideInRight 0.5s ease-in-out forwards',
  			slideOutRight: 'slideOutRight 0.5s ease-in-out forwards',
  			infiniteSpin: 'infiniteSpin 30s linear infinite',
  			slideandSpinInfiniteRightToLeft: 'slideandSpinInfiniteRightToLeft 24s linear infinite',
  			carrouselSlider: 'carrouselSlider 5000ms linear initial backwards',
  			floatMockup: 'floatMockup 6s ease-in-out infinite',
  			floatEmojisLeft: 'floatEmojisLeft 3s ease-in-out infinite',
  			floatingEmojisRight: 'floatingEmojisRight 5s ease-in-out infinite',
  			overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
  			contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
  		},
  		boxShadow: {
  			bubbleShadow: '0 0 40px 30px rgba(255, 255, 255, 0.5)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
}
