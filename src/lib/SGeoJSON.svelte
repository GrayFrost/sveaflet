<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, GeoJSON } from 'leaflet';
	import type { GeoJSONOptions } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import type { LeafletContextInterface } from './types';

	
	interface Props {
		// props
		json?: GeoJsonObject | null;
		options?: GeoJSONOptions | null;
		instance?: GeoJSON | undefined;
	}

	let { json = null, options = null, instance = $bindable(undefined) }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let geoJSON: GeoJSON | undefined = $state();

	onMount(() => {
		geoJSON = new GeoJSON(json, options);
	});

	let map = $derived(getMap?.());
	run(() => {
		instance = geoJSON;
	});

	run(() => {
		if (map) {
			if (geoJSON) {
				map.addLayer(geoJSON);
			}
		}
	});

	function reset() {
		geoJSON?.remove();
		geoJSON = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => geoJSON });
</script>
