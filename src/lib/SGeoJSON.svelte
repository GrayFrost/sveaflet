<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, GeoJSON } from 'leaflet';
	import type { GeoJSONOptions } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import type { LeafletContextInterface } from './types';

	// props
	interface Props {
		json?: GeoJsonObject | null;
		options?: GeoJSONOptions | null;
		instance?: GeoJSON;
	}

	let { json = null, options = null, instance = $bindable() }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let geoJSON: GeoJSON | undefined = $state();

	let map = $derived(getMap?.());

	$effect(() => {
		instance = geoJSON;
	});

	onMount(() => {
		geoJSON = new GeoJSON(json, options);
	});

	$effect(() => {
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
