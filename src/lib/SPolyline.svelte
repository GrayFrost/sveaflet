<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polyline } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useProvideLayer } from '$lib/context';

	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	let mapStore = useConsumeMap();
	let polylineStore = writable<Polyline | undefined>();

	$: if ($mapStore) {
		if (!$polylineStore) {
			$polylineStore = new Polyline(latlngs, options);
		}
		$polylineStore.setLatLngs(latlngs);
		$polylineStore.addTo($mapStore);
	}

	$: instance = $polylineStore;

	onDestroy(() => {
		$polylineStore?.remove();
		$polylineStore = undefined;
	});

	useProvideLayer(polylineStore);
</script>

<slot />
