<script lang="ts">
  import { writable } from 'svelte/store';
	import type { Control } from 'leaflet';
	import { control } from 'leaflet';
	import { useConsumeMap, useProvideControlLayer } from './context.ts';

	export let options: Control.LayersOptions = {};

	let { map: mapStore } = useConsumeMap();

	let layers = writable<Control.Layers | undefined>();

	$: if ($mapStore) {
		$layers = control.layers(undefined, undefined, options);
		$layers.addTo($mapStore);
	}

  useProvideControlLayer(layers);
</script>

<slot />
