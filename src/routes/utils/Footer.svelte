<script lang="ts">
	import { page } from '$app/stores';
	import { Footer, FooterLinkGroup, FooterLink } from 'flowbite-svelte';

	let isHomePage: boolean;
	$: isHomePage = $page.route.id === '/';

	const footer_links = {
		Resources: {
			GitHub: 'https://github.com/GrayFrost/sveaflet',
			Svelte: 'https://svelte.dev/',
			Leaflet: 'https://leafletjs.com/',
			'Flowbite Svelte': 'https://flowbite-svelte.com/'
		},
		'Help and Support': {
			'GitHub Issues': 'https://github.com/GrayFrost/sveaflet/issues'
		},
		Legal: {
			License: 'todo',
			'Brand usage': 'todo'
		}
	};
</script>

<Footer class="bg-white dark:bg-gray-900">
	<div class="flex flex-col py-6 lg:py-12 mx-auto max-w-8xl">
		<div
			class="flex flex-col lg:flex-row items-start md:justify-between gap-8 {isHomePage
				? 'px-4 lg:px-20'
				: ''}"
		>
			<div class="w-full max-w-sm">
				<!-- <FooterBrand href="https://flowbite-svelte.com" src={logo} alt="Flowbite Svelte Logo" name="Flowbite Svelte" class="text-gray-900 dark:text-white" /> -->
				<p class="max-w-sm mb-3 text-gray-600 dark:text-gray-400 mt-4">
					Svelte Svelte Svelte Svelte Svelte Svelte Svelte Svelte Svelte Svelte Svelte Svelte
				</p>
				<p class="max-w-sm mb-3 text-gray-600 dark:text-gray-400">
					Code licensed
					<a href="todo" class="text-primary-600 hover:underline"> todo </a>
					, docs
					<a href="todo" class="text-primary-600 hover:underline"> todo</a>
					.
				</p>
			</div>
			<div
				class="flex flex-col md:flex-row items-start {isHomePage
					? 'gap-4 md:gap-16 lg:justify-end'
					: 'gap-8'}  w-full"
			>
				{#each Object.entries(footer_links) as [column, links]}
					<div>
						<h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
							{column}
						</h2>
						<FooterLinkGroup>
							{#each Object.entries(links) as [name, href]}
								<FooterLink liClass="mb-4" {href}>{name}</FooterLink>
							{/each}
						</FooterLinkGroup>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Footer>
