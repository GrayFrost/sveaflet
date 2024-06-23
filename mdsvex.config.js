import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import examples from 'mdsvexamples';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [[examples, { defaults: { Wrapper: '/src/routes/utils/ExampleWrapper.svelte' } }]],
	rehypePlugins: []
});

export default config;
