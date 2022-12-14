/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#1F53F3',
				secondary: '#9937FC',
				font1: '#303345',
				font2: '#77787C',
				para: '#A3A6AA',
				light: '#F4F9FC',
				light2: '#EFEFEF',
				warning: '#FED81D',
				error: '#FF0000',
				brand1: '#FF1D7C',
				brand2: '#1CD767',
			},
		},
	},
	daisyui: {
		themes: false,
	},
	plugins: [require('daisyui')],
};
