<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { Map, TileLayer } from 'leaflet';
	import type { MapOptions } from 'leaflet';
	import { useProvideMap } from './context.ts';
	import 'leaflet/dist/leaflet.css';

	let mapStore = writable<Map | undefined>();
	let mapContainer: HTMLElement;
	let tileLayer: TileLayer | undefined;
	let dispatch = createEventDispatcher();

	export let options: MapOptions = {};

	onMount(() => {
		$mapStore = new Map(mapContainer, options);
		tileLayer = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {});

		tileLayer.addTo($mapStore);

		$mapStore.on('click', (e) => {
			dispatch('click', e);
		});
	});

	onDestroy(() => {
		$mapStore?.remove();
		$mapStore = undefined;
	});

	const removeDefaultLayer = () => {
		if (tileLayer) {
			$mapStore?.removeLayer(tileLayer);
			tileLayer = undefined;
		}
	};

	useProvideMap({
		map: mapStore,
		removeDefaultLayer
	});
</script>

<div id="sveaflet-map" style="width:100%;height:100%" bind:this={mapContainer}>
	{#if $mapStore}
		<slot />
	{/if}
</div>
