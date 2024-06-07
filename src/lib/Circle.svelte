<script lang="ts">
	import { writable } from 'svelte/store';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import { Circle, type LatLngExpression, type CircleOptions } from 'leaflet?client';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 1 };

	let circleStore = writable<Circle | undefined>();
	
	useProvideLayer(circleStore);

	if ($mapStore) {
		$circleStore = new Circle(latlng, options);
		$circleStore.addTo($mapStore);
	}
</script>

<slot />
