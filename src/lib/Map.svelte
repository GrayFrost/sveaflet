<script context="module" lang="ts">
	import { getContext, setContext } from 'svelte';
	import { Map } from 'leaflet';
	export interface MapContext {
		(): Map | undefined;
	}
	export const MapContextKey = Symbol();
	export const useProvideMap = (state: MapContext) => {
		setContext<MapContext>(MapContextKey, state);
	};

	export const useConsumeMap = (): MapContext => {
		return getContext<MapContext>(MapContextKey);
	};
</script>

<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { type MapOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';

	let map: Map | undefined;
	let mapContainer: HTMLElement;

	export let options: MapOptions = {};

	useProvideMap(() => map);

	onMount(() => {
		map = new Map(mapContainer, options);
		map.setView([51.505, -0.09], 13); // todo
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});
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
