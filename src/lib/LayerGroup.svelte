<script lang="ts">
	import { onDestroy } from 'svelte';
	import { LayerGroup } from 'leaflet';
	import { useConsumeMap, useConsumeControlLayer } from './context.ts';
	import { writable } from 'svelte/store';
	import type { LayerOptions } from 'leaflet';
	import { useProvideLayerGroup } from './context.ts';

	let mapStore = useConsumeMap();
	let controlLayerStore = useConsumeControlLayer();

	let layerGroupStore = writable<LayerGroup | undefined>();
	export let options: LayerOptions = {};
	export let overlayName: string = '';
	export let checked: boolean = false;

	$: if ($mapStore) {
		$layerGroupStore = new LayerGroup([], options);

		if ($controlLayerStore) {
			if (!overlayName) {
				console.warn('Overlay Name is required in ControlLayers');
			}
			if (checked) {
				$mapStore.addLayer($layerGroupStore);
			}
			$controlLayerStore.addOverlay($layerGroupStore, overlayName || 'Overlay Name');
			$controlLayerStore.addTo($mapStore);
		} else {
			$layerGroupStore.addTo($mapStore);
		}
	}

	onDestroy(() => {
		$layerGroupStore?.remove();
		$layerGroupStore = undefined;
	});

	useProvideLayerGroup(layerGroupStore);
</script>

<slot />
