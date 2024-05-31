<script lang="ts">
	import { onMount } from 'svelte';
	import { useConsumeMap } from './context.ts';
	import { Polygon, type LatLngExpression, type PolylineOptions } from 'leaflet';

	let mapStore = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let polygon = new Polygon(latlngs, options);
		polygon.addTo($mapStore);
	}
</script>
