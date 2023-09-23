import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import preprocess from 'svelte-preprocess';

// https://astro.build/config
export default defineConfig({
	integrations: [
		svelte({
			preprocess: preprocess(),
		}),
	],
	output: 'server',
});
