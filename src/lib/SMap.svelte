<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Map, Icon } from 'leaflet';
	import type { MapOptions } from 'leaflet';
	import { useProvideMap } from '$lib/context';
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

	// props
	export let options: MapOptions = {};
	export let instance: Map | undefined = undefined;

	// store
	let mapStore = writable<Map | undefined>();

	// data
	let mapContainer: HTMLElement;
	let preOptions = options;

	onMount(() => {
		if (!$mapStore) {
			$mapStore = new Map(mapContainer, options);
			storeProps({
				options
			});
		}
	});

	$: if ($mapStore) {
		updateView($mapStore, preOptions, options);
		updateZoom($mapStore, preOptions, options);
		storeProps({
			options
		});
	}

	$: instance = $mapStore;

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
		$mapStore?.remove();
		$mapStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideMap(mapStore);
</script>

<div style="width:100%;height:100%" bind:this={mapContainer}>
	{#if $mapStore}
		<slot />
	{/if}
</div>
