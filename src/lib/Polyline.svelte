<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polyline } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from './context.ts';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	let mapStore = useConsumeMap();
	let polylineStore = writable<Polyline | undefined>();

	$: if ($mapStore) {
		reset();
		$polylineStore = new Polyline(latlngs, options);
		$polylineStore.addTo($mapStore);
	}

	$: instance = $polylineStore;

	function reset() {
		$polylineStore?.remove();
		$polylineStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(polylineStore);
</script>

<slot />
