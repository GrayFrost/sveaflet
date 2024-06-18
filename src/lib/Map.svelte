<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { Map, Icon } from 'leaflet';
	import type { MapOptions } from 'leaflet';
	import { useProvideMap } from './context.ts';
	import 'leaflet/dist/leaflet.css';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';

	// @ts-ignore
	delete Icon.Default.prototype._getIconUrl;
	Icon.Default.mergeOptions({
		iconRetinaUrl: markerIcon2x,
		iconUrl: markerIcon,
		shadowUrl: markerShadow
	});

	export let options: MapOptions = {};
	export let instance: Map | undefined = undefined;

	let dispatch = createEventDispatcher();

	let mapStore = writable<Map | undefined>();

	let mapContainer: HTMLElement;
	
	onMount(() => {
		reset(); // todo needed?
		$mapStore = new Map(mapContainer, options);

		// todo events
		$mapStore.on('click', (e) => {
			dispatch('click', e);
		});
		$mapStore.on('move', (e) => {
			dispatch('move', e);
		});
		$mapStore.on('zoom', (e) => {
			dispatch('zoom', e);
		});
	});

	$: instance = $mapStore;

	function reset() {
		$mapStore?.remove();
		$mapStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideMap(mapStore);
</script>

<div id="sveaflet-map" style="width:100%;height:100%" bind:this={mapContainer}>
	{#if $mapStore}
		<slot />
	{/if}
</div>
