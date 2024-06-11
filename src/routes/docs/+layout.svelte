<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		SidebarDropdownWrapper
	} from 'flowbite-svelte';
	import { ChevronDownOutline, ChevronUpOutline } from 'flowbite-svelte-icons';

	export let data: any; // todo typescript

	const posts: Record<string, any[]> = data.posts;

	const names_mapping: Record<string, string> = {
		pages: 'Getting Started'
	};

	const fileDir = (path: string) => path.split('/').slice(0, -1).pop() ?? '';

	$: mainSidebarUrl = $page.url.pathname;
	let activeMainSidebar: string;

	afterNavigate((navigation) => {
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		// closeDrawer();

		activeMainSidebar = navigation.to?.url.pathname ?? '';

		const key = fileDir(activeMainSidebar);
		for (const k in dropdowns) dropdowns[k] = false;
		dropdowns[key] = true;
	});

	let spanClass = '';
	let nonActiveClass =
		'transition-colors duration-200 relative flex items-center flex-wrap font-medium hover:text-gray-900 hover:cursor-pointer text-gray-500 dark:text-gray-400 dark:hover:text-white';
	let activeClass =
		'relative flex items-center flex-wrap font-medium cursor-default text-primary-700 dark:text-primary-700';

	let dropdowns = Object.fromEntries(Object.keys(posts).map((x) => [x, false]));

	console.log('zzh post', posts);

</script>

<Sidebar
	{nonActiveClass}
	activeUrl={mainSidebarUrl}
	asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:static lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-0 lg:block"
>
	<SidebarWrapper
		divClass="overflow-y-auto px-4 pt-20 lg:pt-0 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-8rem)] lg:block dark:bg-gray-900 lg:me-0 lg:sticky top-20"
	>
		<nav class="font-normal text-base lg:text-sm">
			<SidebarGroup ulClass="list-unstyled fw-normal small mb-4">
				{#each Object.entries(posts) as [key, values] (key)}
					<SidebarDropdownWrapper
						bind:isOpen={dropdowns[key]}
						label={names_mapping[key] ?? key}
						ulClass="space-y-2.5"
						btnClass="flex items-center justify-between w-full my-4 text-sm font-semibold tracking-wide uppercase hover:text-primary-700 dark:hover:text-primary-600"
						spanClass=""
						class={dropdowns[key]
							? 'text-primary-700 dark:text-primary-700'
							: 'text-gray-900 dark:text-white'}
					>
						<ChevronDownOutline slot="arrowdown" class="w-6 h-6 text-gray-800 dark:text-white" />
						<ChevronUpOutline slot="arrowup" class="w-6 h-6 text-gray-800 dark:text-white" />
						{#each values as { meta, path }}
							{@const href = `/docs/${key}${path}`}
							{#if meta}
								<SidebarItem
									label={meta.component_title}
									{href}
									{spanClass}
									{activeClass}
									active={activeMainSidebar === href}
								/>
							{/if}
						{/each}
					</SidebarDropdownWrapper>
				{/each}
			</SidebarGroup>
		</nav>
	</SidebarWrapper>
</Sidebar>

<main class="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
	<slot />
</main>
