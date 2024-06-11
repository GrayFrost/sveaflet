<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Polygon } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	let polygon: Polygon | undefined

	if ($mapStore) {
		polygon = new Polygon(latlngs, options);
		polygon.addTo($mapStore);
	}

	onDestroy(() => {
		polygon?.remove();
		polygon = undefined;
	})
</script>
