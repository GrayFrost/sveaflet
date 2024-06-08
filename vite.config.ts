import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import path from 'path';
import examples from 'mdsvexamples/vite';

export default defineConfig({
	plugins: [sveltekit(), examples],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
      'sveaflet': path.resolve(process.cwd(), './src/lib/index.ts')
    }
	}
});
