/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
<<<<<<< HEAD
	theme: {
		extend: {
			colors: {
				primary: '#285AF4',
				secondary: '#F4F4F4',
				dark: '#1E1E1E',
				light: '#EBF0F5',
				brand: '#F79903',
			},
		},
=======
	theme: {},
	daisyui: {
		themes: false,
>>>>>>> dev-shahida
	},
	plugins: [require('daisyui')],
};
