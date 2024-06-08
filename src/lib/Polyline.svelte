<script lang="ts">
	import { Polyline } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let polyline = new Polyline(latlngs, options);
		polyline.addTo($mapStore);

		// map.fitBounds(polyline.getBounds()); // todo
	}
</script>
