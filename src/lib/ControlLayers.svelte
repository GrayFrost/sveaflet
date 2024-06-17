<script lang="ts">
  import { writable } from 'svelte/store';
	import type { Control } from 'leaflet';
	import { control } from 'leaflet';
	import { useConsumeMap, useProvideControlLayer } from './context.ts';

	export let options: Control.LayersOptions = {};
	export let instance: Control.Layers | undefined = undefined;

	let mapStore = useConsumeMap();
	let layersStore = writable<Control.Layers | undefined>();

	$: if ($mapStore) {
		$layersStore = control.layers(undefined, undefined, options);
		$layersStore.addTo($mapStore);
	}

	$: instance = $layersStore;

  useProvideControlLayer(layersStore);
</script>

<slot />
