<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Marker, Icon, Util } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import {
		useConsumeMap,
		useConsumeLayerGroup,
		useProvideLayer,
		useProvideMarker
	} from './context.ts';

	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {
		icon: new Icon.Default()
	};
	export let instance: Marker | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let markerStore = writable<Marker | undefined>();

	$: if ($mapStore) {
		if (!$markerStore) {
			$markerStore = new Marker(latlng, options);
		}
		$markerStore.setLatLng(latlng);
		Util.setOptions($markerStore, options); // todo 其他是否也用 ?

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($markerStore); // todo 其他layer也要加
		} else {
			$markerStore.addTo($mapStore);
		}
	}

	$: instance = $markerStore;

	function reset() {
		$mapStore?.remove();
		$mapStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(markerStore);
	useProvideMarker(markerStore);
</script>

<slot />
