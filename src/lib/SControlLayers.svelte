<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap, useProvideControlLayer } from '$lib/context';

	export let options: Control.LayersOptions = {};
	export let instance: Control.Layers | undefined = undefined;

	let mapStore = useConsumeMap();
	let layersStore = writable<Control.Layers | undefined>();

	$: if ($mapStore) {
		if (!$layersStore) {
			$layersStore = control.layers(undefined, undefined, options);
		} else {
			reset();
			$layersStore = control.layers(undefined, undefined, options);
		}
		$layersStore.addTo($mapStore);
	}

	$: instance = $layersStore;

	function reset() {
		$layersStore?.remove();
		$layersStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideControlLayer(layersStore);
</script>

<slot />
