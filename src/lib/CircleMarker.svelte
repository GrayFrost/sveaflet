<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LatLngExpression, CircleMarkerOptions, Layer } from 'leaflet';
	import { CircleMarker } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	let mapStore = useConsumeMap();
	let circleMarkerStore = writable<CircleMarker | undefined>();

	$: if ($mapStore) {
		if (!$circleMarkerStore) {
			$circleMarkerStore = new CircleMarker(latlng, options);
		}
		$circleMarkerStore.setLatLng(latlng);
		$circleMarkerStore.addTo($mapStore);
	}

	$: instance = $circleMarkerStore;

	onDestroy(() => {
		$circleMarkerStore?.remove();
		$circleMarkerStore = undefined;
	});

	useProvideLayer(circleMarkerStore);
</script>

<slot />
