<script lang="ts">
	import { page } from '$app/state';
	import { PaginationItem } from 'flowbite-svelte';
	import ArrowLeft from './icons/ArrowLeft.svelte';
	import ArrowRight from './icons/ArrowRight.svelte';
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();

	const identity = (x: any) => x;

	const {
		data,
		url,
		params: { slug }
	} = page;

	const components = Object.values(data.posts)
		.flatMap(identity)
		// .filter((x) => x.meta.dir === data.dir)
		.filter((x) => x.meta && x.meta.dir === data.dir)
		.map(({ path, meta }) => ({ path, name: meta.component_title }));

	const index = components.findIndex((x) => x.path === '/' + slug);

	function sibling(next: boolean) {
		const i = next ? index + 1 : index - 1,
			{ path, name } = components[i],
			href = '' + new URL(path.slice(1), url);

		return { href, name };
	}
</script>

<div class="flex flex-col items-start gap-4 py-4">
	{#if index >= 0}
		<div class="flex flex-row justify-between gap-2.5 self-stretch">
			{#if index > 0}
				{@const { name, href } = sibling(false)}
				<PaginationItem
					{href}
					class="flex items-center gap-2.5  hover:text-primary-700  dark:hover:text-primary-700"
				>
					<ArrowLeft />
					{name}
				</PaginationItem>
			{:else}
				<div></div>
			{/if}
			<div class="hidden sm:block">
				{@render children?.()}
			</div>
			{#if index < components.length - 1}
				{@const { name, href } = sibling(true)}
				<PaginationItem
					{href}
					class="flex items-center gap-2.5 hover:text-primary-700 dark: dark:hover:text-primary-700"
				>
					{name}
					<ArrowRight />
				</PaginationItem>
			{:else}
				<div></div>
			{/if}
		</div>
	{/if}
	<div class="sm:hidden">
		{@render children?.()}
	</div>
</div>
