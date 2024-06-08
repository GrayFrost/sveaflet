<script lang="ts">
	import { Rectangle } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import { type LatLngBoundsExpression, type PolylineOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let rectangle = new Rectangle(latLngBounds, options);
		rectangle.addTo($mapStore);
	}
</script>
