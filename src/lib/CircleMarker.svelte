<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import type { LatLngExpression, CircleMarkerOptions, Layer } from 'leaflet';
	import { CircleMarker } from 'leaflet';

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	let mapStore = useConsumeMap();
	let circleMarkerStore = writable<Layer | undefined>();

	$: if ($mapStore) {
		reset();
		$circleMarkerStore = new CircleMarker(latlng, options);
		$circleMarkerStore.addTo($mapStore);
	}

	$: instance = $circleMarkerStore as CircleMarker;

	function reset() {
		$circleMarkerStore?.remove();
		$circleMarkerStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(circleMarkerStore);
</script>

<slot />
