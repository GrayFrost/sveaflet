<script lang="ts">
	import { onMount } from 'svelte';
	import { useConsumeMap } from './context.ts';
	import { Rectangle, type LatLngBoundsExpression, type PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let rectangle = new Rectangle(latLngBounds, options);
		rectangle.addTo($mapStore);
	}
</script>
