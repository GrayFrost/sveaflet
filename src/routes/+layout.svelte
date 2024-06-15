<script lang="ts">
	/**
	 * Inspired by Leaflet, Flowbite-Svelte
	*/
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
	import GitHub from './utils/icons/GitHub.svelte';
	import '../app.css';

	let divClass = 'w-full ms-auto lg:block lg:w-auto order-1 lg:order-none';
	let ulClass =
		'flex flex-col py-3 my-4 lg:flex-row lg:my-0 text-sm font-medium text-gray-900 dark:text-gray-300 gap-4';
</script>

<header
	class="sticky top-0 z-9999 flex-none w-full mx-auto bg-white border-b border-gray-200 dark:border-gray-600 dark:bg-gray-800"
>
	<Navbar fluid class="h-15 py-0 flex items-center">
		<NavBrand href="/">
			<!-- <img src={logo} class="me-3 h-8" alt="Flowbite Svelte Logo" /> -->
			<span
				class="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white"
			>
				Sveaflet
			</span>
		</NavBrand>
		<div class="flex items-center">
			<NavUl
				{divClass}
				{ulClass}
				nonActiveClass="md:!ps-3 md:!py-2 lg:!ps-0 text-gray-700 hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 dark:text-gray-400 lg:dark:text-white lg:dark:hover:text-primary-700 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
				activeClass="md:!ps-3 md:!py-2 lg:!ps-0 text-white bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:dark:text-primary-700 dark:bg-primary-600 lg:dark:bg-transparent cursor-default"
			>
				<NavLi class="lg:px-2 lg:mb-0" href="/">Home</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/pages/introduction">Docs</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/components/Circle">Components</NavLi>
				<NavLi class="lg:px-2 lg:mb-0" href="/docs/examples/sveaflet-quick-start-guide">Examples</NavLi>
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
				<Tooltip class="dark:bg-gray-900" placement="bottom">View on Github</Tooltip>
				<DarkMode size="lg" class="inline-block dark:hover:text-white hover:text-gray-900" />
				<Tooltip class="dark:bg-gray-900" placement="bottom-end">Toggle dark mode</Tooltip>
			</div>
		</div>
	</Navbar>
</header>
<div class="lg:flex">
	<slot />
</div>
