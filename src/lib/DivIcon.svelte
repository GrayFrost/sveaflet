<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DivIcon, Util } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from './context.ts';
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
		Util.setOptions(divIcon, mergeOptions);
		
		$markerStore.setIcon(divIcon);
	}

	$: instance = divIcon;

	function reset() {
		divIcon?.remove?.();
		divIcon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

{#if $$slots.default}
	<div bind:this={htmlElement}>
		<slot />
	</div>
{/if}
