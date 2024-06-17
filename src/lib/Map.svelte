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

	let mapStore = writable<Map | undefined>();
	let mapContainer: HTMLElement;
	let dispatch = createEventDispatcher();

	export let options: MapOptions = {};
	export let instance: Map | undefined = undefined;

	onMount(() => {
		$mapStore = new Map(mapContainer, options);

		$mapStore.on('click', (e) => {
			dispatch('click', e);
		});
	});

	$: instance = $mapStore;

	onDestroy(() => {
		$mapStore?.remove();
		$mapStore = undefined;
	});

	useProvideMap(mapStore);
</script>

<div id="sveaflet-map" style="width:100%;height:100%" bind:this={mapContainer}>
	{#if $mapStore}
		<slot />
	{/if}
</div>
