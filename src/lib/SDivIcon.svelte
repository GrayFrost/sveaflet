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
		let mergeOptions = {
			...options
		};
		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				html: htmlElement // override options
			};
		}
		if (!divIcon) {
			divIcon = new DivIcon(mergeOptions);
		} else {
			reset();
			divIcon = new DivIcon(mergeOptions);
		}

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
