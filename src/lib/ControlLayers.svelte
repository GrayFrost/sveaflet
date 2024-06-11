<script lang="ts">
	import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
	import type { Control } from 'leaflet';
	import { control } from 'leaflet';
	import { useConsumeMap, useProvideControl } from './context.ts';

	export let options: Control.LayersOptions = {};

	let { map: mapStore } = useConsumeMap();

	let layers = writable<Control.Layers | undefined>();

	if ($mapStore) {
		$layers = control.layers(undefined, undefined, options);
		$layers.addTo($mapStore);
	}

  useProvideControl($layers);
</script>
