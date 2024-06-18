<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DivIcon } from 'leaflet';
	import type { DivIconOptions } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from '$lib/context';

	export let options: DivIconOptions = {};
	export let instance: DivIcon | undefined = undefined;

	let mapStore = useConsumeMap();
	let markerStore = useConsumeMarker();

	let divIcon: DivIcon | undefined;
	let htmlElement: HTMLElement | undefined;

	$: if ($mapStore && $markerStore) {
		if (!divIcon) {
			divIcon = new DivIcon(options);
		}

		if (htmlElement) {
			const mergeOptions = {
				...options,
				html: htmlElement // override options
			};
			divIcon = new DivIcon(mergeOptions);
		}
		$markerStore.setIcon(divIcon);
	}

	$: instance = divIcon;

	onDestroy(() => {
		divIcon?.remove?.();
		divIcon = undefined;
	});
</script>

{#if $$slots.default}
	<div bind:this={htmlElement}>
		<slot />
	</div>
{/if}
