<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polyline } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};

	let polylineStore = writable<Polyline | undefined>();

	$: if ($mapStore) {
		$polylineStore = new Polyline(latlngs, options);
		$polylineStore.addTo($mapStore);
	}

	onDestroy(() => {
		$polylineStore?.remove();
		$polylineStore = undefined;
	});

	useProvideLayer(polylineStore);
</script>
