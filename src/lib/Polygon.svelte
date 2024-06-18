<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polygon } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	let mapStore = useConsumeMap();
	let polygonStore = writable<Polygon | undefined>();

	$: if ($mapStore) {
		reset();
		$polygonStore = new Polygon(latlngs, options);
		$polygonStore.addTo($mapStore);
	}

	$: instance = $polygonStore;

	function reset() {
		$polygonStore?.remove();
		$polygonStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(polygonStore);
</script>

<slot />
