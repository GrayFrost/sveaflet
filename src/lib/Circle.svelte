<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LatLngExpression, CircleOptions } from 'leaflet';
	import { Circle, Util } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	let mapStore = useConsumeMap();
	let circleStore = writable<Circle | undefined>();

	$: if ($mapStore) {
		if (!$circleStore) {
			$circleStore = new Circle(latlng, options);
		}
		$circleStore.setLatLng(latlng);
		$circleStore.addTo($mapStore);
	}

	$: instance = $circleStore;

	onDestroy(() => {
		$circleStore?.remove();
		$circleStore = undefined;
	});

	useProvideLayer(circleStore);
</script>

<slot />
