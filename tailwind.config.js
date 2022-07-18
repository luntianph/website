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
				700: '#BB801A'
			},
			green: {
				100: '#C6C980',
				500: '#AEB288',
				700: '#6A7E39'
			}, 
			red: {
				100: '#D5D0C0',
				700: '#B88C68'
			}
		},
		extend: {
			fontFamily: {
				'basteleur': ['Basteleur', ...defaultTheme.fontFamily.serif],
				'gilroy': ['Gilroy', ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}
