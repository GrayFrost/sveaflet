<script lang="ts">
	import { useConsumeMap } from './context.ts';
	import { Polyline, type LatLngExpression, type PolylineOptions } from 'leaflet';

	let mapStore = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let polyline = new Polyline(latlngs, options);
		polyline.addTo($mapStore);

		// map.fitBounds(polyline.getBounds()); // todo
	}
</script>
