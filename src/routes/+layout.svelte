<script lang="ts">
	import { run } from 'svelte/legacy';

	/**
	 * Inspired by Svelte, Leaflet, Flowbite-Svelte
	 */
	import { page } from '$app/stores';
	import {
		DarkMode,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		ToolbarButton,
		Tooltip
	} from 'flowbite-svelte';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import GitHub from './utils/icons/GitHub.svelte';
	import DocBadge from './utils/DocBadge.svelte';
	import AlgoliaSearch from './utils/AlgoliaSearch.svelte';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';
	import '../app.css';

	interface Props {
		data: { appId: string; apiKey: string };
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();

	let isHomePage: boolean = $derived($page.route.id === '/');
	
	const version = __VERSION__;
	let activeUrl = $derived($page.url.pathname);
	let divClass = 'w-full ms-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium text-gray-900 dark:text-gray-300 gap-4';
	let logo = '/images/sveaflet.png';

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	run(() => {
		if ($navigating) {
			NProgress.start();
		}
		if (!$navigating) {
			NProgress.done();
		}
	});

	const drawerHiddenStore: Writable<boolean> = writable<boolean>(true);
	setContext('drawer', drawerHiddenStore);

	const toggleDrawer = () => {
		drawerHiddenStore.update((state) => !state);
	};
</script>

<header
	class="sticky top-0 z-1002 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar
		color="default"
		fluid
		class="h-15 py-0 flex items-center {isHomePage ? 'lg:px-0 max-w-7xl mx-auto' : ''}"
		
	>
		{#snippet children({ toggle })}
				<span hidden={$page.route.id === '/'}>
				<NavHamburger onClick={toggleDrawer} class="m-0 me-3 md:block lg:hidden" />
			</span>
			<NavBrand href="/" class="relative">
				<img src={logo} class="me-3 h-8" alt="Sveaflet Logo" />
				<span
					class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white sveaflet-text"
				>
					Sveaflet
				</span>
				<div class="dark:sveaflet-bg"></div>
			</NavBrand>
			<AlgoliaSearch apiKey={data.apiKey} appId={data.appId} />
			<NavUl
				{divClass}
				{ulClass}
				{activeUrl}
				on:click={() => setTimeout(toggle, 1)}
				nonActiveClass="md:!ps-3 md:!py-2 lg:!ps-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
				activeClass="md:!ps-3 md:!py-2 lg:!ps-0 text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:dark:text-primary-700 dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
			>
				<NavLi class="lg:px-2 lg:mb-0" href="/">Home</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/pages/introduction">Docs</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/components/Circle">Components</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/examples/sveaflet-quick-start-guide"
					>Examples</NavLi
				>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/extra/plugins">Extra</NavLi>
			</NavUl>
			<div class="flex items-center ms-auto">
				<ToolbarButton
					class="hidden sm:inline-block dark:hover:text-white hover:text-gray-900 focus:ring-0"
					name="View on GitHub"
					target="_blank"
					rel="noreferrer"
					size="lg"
					href="https://github.com/GrayFrost/sveaflet"
				>
					<GitHub />
				</ToolbarButton>
				<DarkMode size="lg" class="inline-block dark:hover:text-white hover:text-gray-900" />
			</div>

			<a href="https://www.npmjs.com/package/sveaflet" class="hidden sm:block">
				<DocBadge
					large
					class="ms-2 xl:ms-6 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-800 dark:hover:text-white"
				>
					v{version}
				</DocBadge>
			</a>

			<NavHamburger
				on:click={toggle}
				class="ms-3 m-0 md:block lg:hidden {isHomePage ? '' : 'hidden'}"
			/>
					{/snippet}
		</Navbar>
</header>

<div class="lg:flex">
	{@render children?.()}
</div>

<style>
	:global(#nprogress .bar) {
		background: #d43008;
	}
	:global(#nprogress .peg) {
		box-shadow:
			0 0 10px #d43008,
			0 0 5px #d43008;
	}
</style>
