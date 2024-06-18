<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DivIcon } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from '$lib/context';
	import type { DivIconOptions } from 'leaflet';

	export let options: DivIconOptions = {};
	export let instance: DivIcon | undefined = undefined;

	let mapStore = useConsumeMap();
	let markerStore = useConsumeMarker();

	let divIcon: DivIcon | undefined;
	let htmlElement: HTMLElement | undefined;

	$: if ($mapStore && $markerStore) {
		let mergeOptions = {
			...options
		};

		if (htmlElement) {
			// slot priority greater than string
			mergeOptions = {
				...mergeOptions,
				html: htmlElement
			};
		}
		if (!divIcon) {
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
