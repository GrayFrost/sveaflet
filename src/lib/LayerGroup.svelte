<script lang="ts">
	import { onDestroy } from 'svelte';
	import { LayerGroup } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import { writable } from 'svelte/store';
	import type { LayerOptions } from 'leaflet';
	import { useProvideLayerGroup } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	let layerGroupStore = writable<LayerGroup | undefined>();
	export let options: LayerOptions = {};

	useProvideLayerGroup(layerGroupStore);

	if ($mapStore) {
		$layerGroupStore = new LayerGroup([], options);
		$layerGroupStore.addTo($mapStore);
	}

	onDestroy(() => {
		$layerGroupStore?.remove();
		$layerGroupStore = undefined;
	})
</script>

<slot />
