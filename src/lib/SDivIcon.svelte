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

	$: if ($mapStore) {
		if ($markerStore) {
			let mergeOptions = {
				...options
			};
			if (htmlElement) {
				mergeOptions = {
					...mergeOptions,
					html: htmlElement // override options
				};
			}
			reset();
			divIcon = new DivIcon(mergeOptions);

			$markerStore.setIcon(divIcon);
		} else {
			console.warn('DivIcon should bind Marker.');
		}
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
	<div bind:this={htmlElement} {...$$restProps}>
		<slot />
	</div>
{/if}
