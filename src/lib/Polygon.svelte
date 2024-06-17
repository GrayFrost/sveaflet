<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polygon } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	let mapStore = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	let polygonStore = writable<Polygon | undefined>();

	$: if ($mapStore) {
		$polygonStore = new Polygon(latlngs, options);
		$polygonStore.addTo($mapStore);
	}

	onDestroy(() => {
		$polygonStore?.remove();
		$polygonStore = undefined;
	});

	useProvideLayer(polygonStore);
</script>

<slot />
