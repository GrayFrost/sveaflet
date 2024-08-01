<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { Map, Icon } from 'leaflet';
	import type { MapOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// @ts-ignore
	delete Icon.Default.prototype._getIconUrl;
	Icon.Default.mergeOptions({
		iconRetinaUrl: markerIcon2x,
		iconUrl: markerIcon,
		shadowUrl: markerShadow
	});

	// props
	export let options: MapOptions = {};
	export let instance: Map | undefined = undefined;

	// data
	let map: Map | undefined;
	let mapContainer: HTMLElement;
	let compare: Compare;

	$: instance = map;

	onMount(() => {
		map = new Map(mapContainer, options);
		compare = new Compare(map, $$props);
	});

	$: if (map) {
		compare.updateProps($$props);
		compare.storeProps($$props)
	}

	function reset() {
		map?.remove();
		map = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext<LeafletContextInterface>(Map, { getMap: () => map });
</script>

<div style="width:100%;height:100%" bind:this={mapContainer}>
	{#if map}
		<slot />
	{/if}
</div>
