<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { type MapOptions, Map, TileLayer } from 'leaflet?client';
	import 'leaflet/dist/leaflet.css';

	import { useProvideMap } from './context.ts';

	let mapStore = writable<Map | undefined>();
	let mapContainer: HTMLElement;
	let tileLayer: TileLayer | undefined;
	let dispatch = createEventDispatcher();

	export let options: MapOptions = {};

	const removeDefaultLayer = () => {
		if (tileLayer) {
			$mapStore.removeLayer(tileLayer);
			tileLayer = undefined;
		}
	}

	onMount(() => {
		$mapStore = new Map(mapContainer, options);
		tileLayer = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {});

		tileLayer.addTo($mapStore);

		$mapStore.on('click',(e) => {
			dispatch('click', e);
		})
	});

	onDestroy(() => {
		$mapStore?.remove();
		$mapStore = undefined;
	});

	useProvideMap({
		map: mapStore,
		removeDefaultLayer
	});
</script>

<div id="sveaflet-map" style="width:100%;height:100%;" bind:this={mapContainer}>
	{#if $mapStore}
		<slot />
	{/if}
</div>

