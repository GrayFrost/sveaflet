<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Rectangle, Util } from 'leaflet';
	import { type LatLngBoundsExpression, type PolylineOptions } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};
	export let instance: Rectangle | undefined = undefined;

	let mapStore = useConsumeMap();
	let rectangleStore = writable<Rectangle | undefined>();

	$: if ($mapStore) {
		if (!$rectangleStore) {
			$rectangleStore = new Rectangle(latLngBounds, options);
		}
		$rectangleStore.setBounds(latLngBounds);
		$rectangleStore.addTo($mapStore);
	}

	$: instance = $rectangleStore;

	onDestroy(() => {
		$rectangleStore?.remove();
		$rectangleStore = undefined;
	});

	useProvideLayer(rectangleStore);
</script>

<slot />
