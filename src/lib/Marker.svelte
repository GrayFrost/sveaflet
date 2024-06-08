<script lang="ts">
	import { writable } from 'svelte/store';
	import { Marker } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
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

	if ($mapStore) {
		$markerStore = new Marker(latlng, options);
		if ($layerGroupStore) {
			$layerGroupStore.addLayer($markerStore);
		} else {
			$markerStore.addTo($mapStore);
		}
	}

	useProvideLayer(markerStore);
	useProvideMarker(markerStore);
</script>

<slot />
