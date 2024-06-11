<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Polyline } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	let polyline: Polyline | undefined;

	if ($mapStore) {
		polyline = new Polyline(latlngs, options);
		polyline.addTo($mapStore);
	}

	onDestroy(() => {
		polyline?.remove();
		polyline = undefined;
	})
</script>
