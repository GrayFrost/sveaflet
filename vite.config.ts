import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite';
import path from 'path';
import examples from 'mdsvexamples/vite';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	plugins: [sveltekit(), examples, svelteTesting()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
	},
	resolve: {
		alias: {
			sveaflet: path.resolve(process.cwd(), './src/lib/index.ts')
		}
	},
	define: {
		__VERSION__: `"${pkg.version}"`
	}
});
