<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Rectangle } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import { type LatLngBoundsExpression, type PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};

	let rectangle: Rectangle | undefined;

	if ($mapStore) {
		rectangle = new Rectangle(latLngBounds, options);
		rectangle.addTo($mapStore);
	}

	onDestroy(() => {
		rectangle?.remove();
		rectangle = undefined;
	})
</script>
