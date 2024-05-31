<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useConsumeMap } from './context.ts';
	import { Circle, type LatLngExpression, type CircleOptions } from 'leaflet';

	let map = useConsumeMap()();

	export let latlng: LatLngExpression;
	export let options: CircleOptions = {};

	onMount(() => {
		if (map) {
			let circle = new Circle(latlng, options);
			circle.addTo(map);
		}
	});
</script>
