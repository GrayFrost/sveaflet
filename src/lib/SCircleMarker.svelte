<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { CircleMarker } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let circleMarkerStore = writable<CircleMarker | undefined>();

	$: if ($mapStore) {
		reset();
		$circleMarkerStore = new CircleMarker(latlng, options);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($circleMarkerStore);
		} else {
			$circleMarkerStore.addTo($mapStore);
		}
	}

	$: instance = $circleMarkerStore;

	function reset() {
		$circleMarkerStore?.remove();
		$circleMarkerStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(circleMarkerStore);
</script>

<slot />
