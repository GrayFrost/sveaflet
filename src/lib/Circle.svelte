<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LatLngExpression, CircleOptions } from 'leaflet';
	import { Circle } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 1 };

	let circleStore = writable<Circle | undefined>();

	$: if ($mapStore) {
		$circleStore = new Circle(latlng, options);
		$circleStore.addTo($mapStore);
	}

	onDestroy(() => {
		$circleStore?.remove();
		$circleStore = undefined;
	});

	useProvideLayer(circleStore);
</script>

<slot />
