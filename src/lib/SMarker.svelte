<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Marker, Icon } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import {
		useConsumeMap,
		useConsumeLayerGroup,
		useProvideLayer,
		useProvideMarker
	} from '$lib/context';

	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {
		icon: new Icon.Default()
	};
	export let instance: Marker | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let markerStore = writable<Marker | undefined>();

	$: if ($mapStore) {
		reset();
		$markerStore = new Marker(latlng, options);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($markerStore);
		} else {
			$markerStore.addTo($mapStore);
		}
	}

	$: instance = $markerStore;

	function reset() {
		$markerStore?.remove();
		$markerStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(markerStore);
	useProvideMarker(markerStore);
</script>

<slot />
