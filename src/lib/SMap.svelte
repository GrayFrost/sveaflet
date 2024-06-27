<script lang="ts">
	import { onMount, onDestroy, setContext } from 'svelte';
	import { Map, Icon } from 'leaflet';
	import type { MapOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';
	import type { LeafletContextInterface } from './types';

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
	let preOptions = options;

	$: instance = map;

	onMount(() => {
		map = new Map(mapContainer, options);
		storeProps({
			options
		});
	});

	$: if (map) {
		updateView(map, preOptions, options);
		updateZoom(map, preOptions, options);
		storeProps({
			options
		});
	}

	function updateView(obj: Map, preOpt: MapOptions, opt: MapOptions) {
		if (opt.center !== preOpt.center && opt.center !== undefined) {
			obj.setView(opt.center);
		}
	}

	function updateZoom(obj: Map, preOpt: MapOptions, opt: MapOptions) {
		if (opt.zoom !== preOpt.zoom && opt.zoom !== undefined) {
			obj.setZoom(opt.zoom);
		}
	}

	function storeProps(props: { options: MapOptions }) {
		const { options } = props;
		preOptions = Object.create(options);
	}

	function reset() {
		map?.remove();
		map = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext<LeafletContextInterface>(Map, Object.freeze({ getMap: () => map }));
</script>

<div style="width:100%;height:100%" bind:this={mapContainer}>
	{#if map}
		<slot />
	{/if}
</div>
