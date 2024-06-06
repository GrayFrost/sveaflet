<script lang="ts">
	import { useConsumeMap } from './context.ts';
	import { Circle, type LatLngExpression, type CircleOptions } from 'leaflet?client';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 1 };

	if ($mapStore) {
		let circle = new Circle(latlng, options);
		circle.addTo($mapStore);
	}
</script>
