const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#64802C'
			},
			fontFamily: {
				'luntian': ['Luntian', 'sans-serif'],
				'serif': ['Luntian', ...defaultTheme.fontFamily.serif]
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}
