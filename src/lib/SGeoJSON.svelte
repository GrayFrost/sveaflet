<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, GeoJSON } from 'leaflet';
	import type { GeoJSONOptions } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import type { LeafletContextInterface } from './types';

	// props
	export let json: GeoJsonObject | null = null;
	export let options: GeoJSONOptions | null = null;
	export let instance: GeoJSON | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let geoJSON: GeoJSON | undefined;

	onMount(() => {
		geoJSON = new GeoJSON(json, options);
	});

	$: map = getMap?.();
	$: instance = geoJSON;

	$: if (map) {
		if (geoJSON) {
			map.addLayer(geoJSON);
		}
	}

	function reset() {
		geoJSON?.remove();
		geoJSON = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => geoJSON });
</script>
