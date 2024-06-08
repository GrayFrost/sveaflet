<script lang="ts">
	import { Polygon } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let polygon = new Polygon(latlngs, options);
		polygon.addTo($mapStore);
	}
</script>
