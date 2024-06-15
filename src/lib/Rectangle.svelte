<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Rectangle } from 'leaflet';
	import { type LatLngBoundsExpression, type PolylineOptions } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};

	let rectangleStore = writable<Rectangle | undefined>();

	if ($mapStore) {
		$rectangleStore = new Rectangle(latLngBounds, options);
		$rectangleStore.addTo($mapStore);
	}

	onDestroy(() => {
		$rectangleStore?.remove();
		$rectangleStore = undefined;
	});

	useProvideLayer(rectangleStore);
</script>
