<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Map, type MapOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { useProvideMap } from './context.ts';

	let map: Map;
	let mapContainer: HTMLElement;

	export let options: MapOptions = {};

	useProvideMap(() => map);

	onMount(() => {
		map = new Map(mapContainer, options);
		map.setView([51.505, -0.09], 13);

		// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	attribution:
		// 		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		// }).addTo(map);

		// L.marker([51.5, -0.09])
		// 	.addTo(map)
		// 	.bindPopup('A pretty CSS popup.<br> Easily customizable.')
		// 	.openPopup();
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	})
</script>

<div id="sveaflet-map" bind:this={mapContainer}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	#sveaflet-map {
		width: 100vw;
		height: 500px;
	}
</style>
