<script lang="ts">
	import { page } from '$app/stores';
	import { Footer, FooterLinkGroup, FooterLink, FooterBrand } from 'flowbite-svelte';

	let logo = '/images/favicon.svg';
	let isHomePage: boolean = $derived($page.route.id === '/');
	

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
			License: 'https://github.com/GrayFrost/sveaflet/blob/main/LICENSE'
		}
	};
</script>

<Footer class="bg-white dark:bg-gray-900">
	<div class="flex flex-col py-6 lg:py-12 mx-auto max-w-[90rem]">
		<div
			class="flex flex-col lg:flex-row items-start md:justify-between gap-8 {isHomePage
				? 'px-4 lg:px-20'
				: ''}"
		>
			<div class="w-full max-w-sm">
				<FooterBrand
					href="https://sveaflet.vercel.app/"
					src={logo}
					alt="Sveaflet Logo"
					name="Sveaflet"
					class="text-gray-900 dark:text-white"
				/>
				<p class="max-w-sm mb-3 text-gray-600 dark:text-gray-400 mt-4">
					Sveaflet is an open-source Map component library built with Svelte components and Leaflet
					that can help you build your map page faster.
				</p>
				<p class="max-w-sm mb-3 text-gray-600 dark:text-gray-400">
					Code licensed
					<a
						href="https://github.com/GrayFrost/sveaflet/blob/main/LICENSE"
						class="text-primary-600 hover:underline"
					>
						MIT
					</a>
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
