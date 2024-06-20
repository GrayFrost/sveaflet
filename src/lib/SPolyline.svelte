<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polyline } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let polylineStore = writable<Polyline | undefined>();

	$: if ($mapStore) {
		reset();
		$polylineStore = new Polyline(latlngs, options);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($polylineStore);
		} else {
			$polylineStore.addTo($mapStore);
		}
	}

	$: instance = $polylineStore;

	function reset() {
		$polylineStore?.remove();
		$polylineStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(polylineStore);
</script>

<slot />
