<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { Map, TileLayer, Icon } from 'leaflet';
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
	let tileLayer: TileLayer | undefined;
	let dispatch = createEventDispatcher();

	export let id: string = '';
	export let options: MapOptions = {};
	export let instance: Map | undefined;

	onMount(() => {
		if (id) {
			$mapStore = new Map(id, options);
		} else {
			$mapStore = new Map(mapContainer, options);
		}

		tileLayer = new TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {});

		tileLayer.addTo($mapStore);

		$mapStore.on('click', (e) => {
			dispatch('click', e);
		});
	});

	$: instance = $mapStore;

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

{#if !id}
	<div id="sveaflet-map" style="width:100%;height:100%" bind:this={mapContainer}>
		{#if $mapStore}
			<slot />
		{/if}
	</div>
{/if}
