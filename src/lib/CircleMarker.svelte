<script lang="ts">
	import { writable } from 'svelte/store';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import type { LatLngExpression, CircleMarkerOptions, Layer } from 'leaflet';
	import { CircleMarker } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 1 };

	let circleMarker = writable<Layer | undefined>();

	if ($mapStore) {
		$circleMarker = new CircleMarker(latlng, options);
		$circleMarker.addTo($mapStore);
	}

	useProvideLayer(circleMarker);
</script>
