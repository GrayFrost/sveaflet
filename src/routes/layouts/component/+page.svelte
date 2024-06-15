<script context="module">
	import h1 from './h1.svelte';
	import h2 from './h2.svelte';
	import h3 from './h3.svelte';
	export { h1, h2, h3 };
</script>

<script>
	import Footer from '../../utils/Footer.svelte';
	import Toc from '../../utils/Toc.svelte';
	import PageHeadSection from '../../utils/PageHeadSection.svelte';
	import { extract } from './Anchor.svelte';

	export let /** @type {string} */ title;
	export let /** @type {string} */ breadcrumb_title;
	export let /** @type {string} */ component_title = '';
	export let /** @type {string} */ dir;
	export let /** @type {string} */ description;
	export let /** @type {string} */ layout = '';

	// calm down `unused export property` warrning
	layout;
	component_title;
</script>

<div class="flex w-full">
	<div
		class="flex flex-col max-w-4xl mx-auto px-4 min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16 divide-y divide-gray-200 dark:divide-gray-800"
	>
		<PageHeadSection {dir} {breadcrumb_title} {title} {description} />
		<div id="mainContent" class="py-8">
			<slot />
		</div>
		<Footer />
	</div>

	<Toc {extract} headingSelector="#mainContent > :where(h2, h3)" />
</div>
