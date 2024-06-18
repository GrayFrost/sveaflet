<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polygon } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let polygonStore = writable<Polygon | undefined>();

	$: if ($mapStore) {
		if (!$polygonStore) {
			$polygonStore = new Polygon(latlngs, options);
		}
		$polygonStore.setLatLngs(latlngs);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($polygonStore);
		} else {
			$polygonStore.addTo($mapStore);
		}
	}

	$: instance = $polygonStore;

	onDestroy(() => {
		$polygonStore?.remove();
		$polygonStore = undefined;
	});

	useProvideLayer(polygonStore);
</script>

<slot />
