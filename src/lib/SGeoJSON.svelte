<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { GeoJSON } from 'leaflet';
	import type { GeoJSONOptions } from 'leaflet';
	import type { GeoJsonObject } from 'geojson';
	import { useConsumeMap, useProvideLayer } from '$lib/context';

	// props
	export let json: GeoJsonObject | null = null;
	export let options: GeoJSONOptions | null = null;
	export let instance: GeoJSON | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let geoJSONStore = writable<GeoJSON | undefined>();

	onMount(() => {
		$geoJSONStore = new GeoJSON(json, options);
	});

	$: if ($mapStore) {
		if ($geoJSONStore) {
			$geoJSONStore.addTo($mapStore);
		}
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
