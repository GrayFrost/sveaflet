<script lang="ts">
	import { useConsumeMap } from './context.ts';
	import { Rectangle, type LatLngBoundsExpression, type PolylineOptions } from 'leaflet?client';

	let { map: mapStore } = useConsumeMap();

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};

	if ($mapStore) {
		let rectangle = new Rectangle(latLngBounds, options);
		rectangle.addTo($mapStore);
	}
</script>
