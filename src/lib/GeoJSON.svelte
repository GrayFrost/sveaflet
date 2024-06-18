<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { type GeoJSONOptions, GeoJSON } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	export let json: GeoJsonObject | null = null;
	export let options: GeoJSONOptions | null = null;
	export let instance: GeoJSON | undefined;

	let mapStore = useConsumeMap();
	let geoJSONStore = writable<GeoJSON | undefined>();

	$: if ($mapStore) {
		reset();
		$geoJSONStore = new GeoJSON(json, options);
		$geoJSONStore.addTo($mapStore);
	}

	$: instance = $geoJSONStore;

	function reset() {
		$geoJSONStore?.remove();
		$geoJSONStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(geoJSONStore);
</script>
