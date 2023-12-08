const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [{
		pattern: /hljs+/
	}],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: true,
		darkTheme: 'night'
	},
	plugins: [typography, daisyui,require('tailwind-highlightjs')]
};

module.exports = config;
