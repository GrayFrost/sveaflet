// import * as FlowbitePlugin from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/routes/**/*.{html,js,svelte,ts}',
    './src/app.html',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	// plugins: [FlowbitePlugin.default],
	darkMode: 'selector',
	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				}
			},
			zIndex: {
				999: 999
			}
		}
	}
};
