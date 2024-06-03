<script lang="ts">
	import { writable } from 'svelte/store';
	import { type LatLngExpression, type MarkerOptions, Marker } from 'leaflet';
	import { useConsumeMap, useProvideMarker } from './context.ts';

	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {};

	let mapStore = useConsumeMap();
	let markerStore = writable<Marker | undefined>();

	useProvideMarker(markerStore);

	if ($mapStore) {
		$markerStore = new Marker(latlng, options);
		$markerStore.addTo($mapStore);
	}
</script>

<slot />
