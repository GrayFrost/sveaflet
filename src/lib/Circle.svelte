<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LatLngExpression, CircleOptions } from 'leaflet';
	import { Circle } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	let mapStore = useConsumeMap();
	let circleStore = writable<Circle | undefined>();

	$: if ($mapStore) {
		reset();
		$circleStore = new Circle(latlng, options);
		$circleStore.addTo($mapStore);
	}

	$: instance = $circleStore;

	function reset() {
		$circleStore?.remove();
		$circleStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(circleStore);
</script>

<slot />
