<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import type { LatLngExpression, CircleMarkerOptions, Layer } from 'leaflet';
	import { CircleMarker } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };

	let circleMarker = writable<Layer | undefined>();

	$: if ($mapStore) {
		$circleMarker = new CircleMarker(latlng, options);
		$circleMarker.addTo($mapStore);
	}

	onDestroy(() => {
		$circleMarker?.remove();
		$circleMarker = undefined;
	})

	useProvideLayer(circleMarker);
</script>
