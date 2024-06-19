<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { GeoJSON } from 'leaflet';
	import type { GeoJSONOptions } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import { useConsumeMap, useProvideLayer } from '$lib/context';

	export let json: GeoJsonObject | null = null;
	export let options: GeoJSONOptions | null = null;
	export let instance: GeoJSON | undefined;

	let mapStore = useConsumeMap();
	let geoJSONStore = writable<GeoJSON | undefined>();

	$: if ($mapStore) {
		if (!$geoJSONStore) {
			$geoJSONStore = new GeoJSON(json, options);
		} else {
			reset();
			$geoJSONStore = new GeoJSON(json, options);
		}
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
