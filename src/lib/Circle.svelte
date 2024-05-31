<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useConsumeMap } from './context.ts';
	import { Circle, type LatLngExpression, type CircleOptions } from 'leaflet';

	let mapStore = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 1 };

	if ($mapStore) {
		let circle = new Circle(latlng, options);
		circle.addTo($mapStore);
	}
</script>
