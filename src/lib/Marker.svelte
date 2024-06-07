<script lang="ts">
	import { writable } from 'svelte/store';
	import { type LatLngExpression, type MarkerOptions, Marker } from 'leaflet?client';
	import {
		useConsumeMap,
		useConsumeLayerGroup,
		useProvideLayer,
		useProvideMarker
	} from './context.ts';

	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {};

	let { map: mapStore } = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let markerStore = writable<Marker | undefined>();

	useProvideLayer(markerStore);
	useProvideMarker(markerStore);

	if ($mapStore) {
		$markerStore = new Marker(latlng, options);
		if ($layerGroupStore) {
			$layerGroupStore.addLayer($markerStore);
		} else {
			$markerStore.addTo($mapStore);
		}
	}
</script>

<slot />
