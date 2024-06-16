<script lang="ts">
	import { onDestroy } from 'svelte';
	import { DivIcon } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from './context.ts';
	import type { DivIconOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();
	let markerStore = useConsumeMarker();

	export let options: DivIconOptions = {};

	let divIcon: DivIcon | undefined;
	let htmlElement: HTMLElement | undefined;

	$: if ($mapStore && $markerStore) {
    let mergeOptions = {
      ...options,
    }

    if (htmlElement) { // slot priority greater than string
      mergeOptions = {
        ...mergeOptions,
        html: htmlElement
      }
    }
		divIcon = new DivIcon(mergeOptions);
		$markerStore.setIcon(divIcon);
	}

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
