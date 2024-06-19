<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Circle } from 'leaflet';
	import type { LatLngExpression, CircleOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let circleStore = writable<Circle | undefined>();

	$: if ($mapStore) {
		if (!$circleStore) { // init
			$circleStore = new Circle(latlng, options);
		} else { // update when props change
			reset();
			$circleStore = new Circle(latlng, options);
		}

		if ($layerGroupStore) {
			$layerGroupStore.addLayer($circleStore);
		} else {
			$circleStore.addTo($mapStore);
		}
	}

	$: instance = $circleStore;

	function reset() {
		$circleStore?.remove();
		$circleStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(circleStore);
</script>

<slot />
