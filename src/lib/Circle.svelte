<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { useConsumeMap } from './Map.svelte';
	import { Circle, type LatLngExpression, type CircleOptions } from 'leaflet';

	let map = useConsumeMap()();

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 1 };

	onMount(() => {
		if (map) {
			let circle = new Circle(latlng, options);
			circle.addTo(map);
		}
	});
</script>
