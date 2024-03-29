const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			transparent: colors.transparent,
			white: colors.white,
			gray: colors.gray,
			yellow: {
				100: '#C0AB72',
				500: '#B49B6C',
				700: '#BB801A',
				800: '#A87F27',
			},
			green: {
				50: '#EFEEE9',
				100: '#C6C980',
				200: '#EBE8DD',
				400: '#B7BB96',
				500: '#AEB288',
				700: '#6A7E39',
				800: '#64802C'
			},
			red: {
				100: '#D5D0C0',
				700: '#B88C68'
			},
			brown: {
				400: '#818162',
				700: '#826e4b',
				800: '#7b736f',
			}
		},
		extend: {
			fontFamily: {
				'basteleur': ['Basteleur', ...defaultTheme.fontFamily.serif],
				'gilroy': ['Gilroy', ...defaultTheme.fontFamily.sans]
			},
			animation: {
				fadeIn: 'fadeIn 1s ease-in-out'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				}
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}
