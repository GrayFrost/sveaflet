<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, GeoJSON } from 'leaflet';
	import type { GeoJSONOptions } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';

	// props
	export let json: GeoJsonObject | null = null;
	export let options: GeoJSONOptions | null = null;
	export let instance: GeoJSON | undefined = undefined;

	// store
	let geoJSON: GeoJSON | undefined;

	let parentContext: any = getContext(Map);
	const { getMap } = parentContext;
	onMount(() => {
		geoJSON = new GeoJSON(json, options);
	});

	$: map = getMap?.();

	$: if (map) {
		if (geoJSON) {
			map.addLayer(geoJSON);
		}
	}

	$: instance = geoJSON;

	function reset() {
		geoJSON?.remove();
		geoJSON = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => geoJSON }));
</script>
