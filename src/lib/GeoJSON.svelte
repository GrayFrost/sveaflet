<script lang="ts">
	import { writable } from 'svelte/store';
	import { type GeoJSONOptions, GeoJSON } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	export let json: GeoJsonObject | null = null;
	export let options: GeoJSONOptions | null = null;

	let geoJSONStore = writable<GeoJSON | undefined>();

	$: if ($mapStore) {
		$geoJSONStore = new GeoJSON(json, options);
    $geoJSONStore.addTo($mapStore);
	}

	useProvideLayer(geoJSONStore);
</script>
