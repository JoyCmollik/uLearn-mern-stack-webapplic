/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {},
	daisyui: {
		themes: false,
	},
	plugins: [require('daisyui')],
};
