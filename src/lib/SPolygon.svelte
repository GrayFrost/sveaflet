<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polygon } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from '$lib/context';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	let mapStore = useConsumeMap();
	let polygonStore = writable<Polygon | undefined>();

	$: if ($mapStore) {
		if (!$polygonStore) {
			$polygonStore = new Polygon(latlngs, options);
		}
		$polygonStore.setLatLngs(latlngs);
		$polygonStore.addTo($mapStore);
	}

	$: instance = $polygonStore;

	onDestroy(() => {
		$polygonStore?.remove();
		$polygonStore = undefined;
	});

	useProvideLayer(polygonStore);
</script>

<slot />
