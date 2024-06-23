<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { DivIcon } from 'leaflet';
	import type { DivIconOptions } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from '$lib/context';

	// props
	export let options: DivIconOptions = {};
	export let instance: DivIcon | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let markerStore = useConsumeMarker();

	// data
	let divIcon: DivIcon | undefined;
	let htmlElement: HTMLElement | undefined;

	onMount(() => {
		let mergeOptions = {
			...options
		};
		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				html: htmlElement // override options
			};
		}
		divIcon = new DivIcon(mergeOptions);
	});

	$: if ($mapStore) {
		if (divIcon) {
			if ($markerStore) {
				$markerStore.setIcon(divIcon);
			} else {
				console.warn('DivIcon should bind Marker.');
			}
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
