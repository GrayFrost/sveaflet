<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Rectangle } from 'leaflet';
	import type { LatLngBoundsExpression, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};
	export let instance: Rectangle | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let rectangleStore = writable<Rectangle | undefined>();

	$: if ($mapStore) {
		reset();
		$rectangleStore = new Rectangle(latLngBounds, options);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($rectangleStore);
		} else {
			$rectangleStore.addTo($mapStore);
		}
	}

	$: instance = $rectangleStore;

	function reset() {
		$rectangleStore?.remove();
		$rectangleStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(rectangleStore);
</script>

<slot />
