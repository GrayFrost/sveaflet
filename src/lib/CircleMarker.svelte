<script lang="ts">
	import { writable } from 'svelte/store';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import { CircleMarker, type LatLngExpression, type CircleMarkerOptions } from 'leaflet?client';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 1 };

	let circleMarker = writable<CircleMarker | undefined>();

	useProvideLayer($circleMarker);

	if ($mapStore) {
		$circleMarker = new CircleMarker(latlng, options);
		$circleMarker.addTo($mapStore);
	}
</script>
