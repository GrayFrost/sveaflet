<script lang="ts">
	import { onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import { useConsumeMap, useConsumeControlLayer } from './context.ts';

	export let urlTemplate: string;
	export let options: TileLayerOptions = {};
	export let layerName: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;

	let mapStore = useConsumeMap();
	let controlLayerStore = useConsumeControlLayer();

	let tileLayer: TileLayer | undefined;

	$: if ($mapStore) {
		reset();
		tileLayer = new TileLayer(urlTemplate, options);

		if ($controlLayerStore) {
			if (!layerName) {
				console.warn('Layer Name is required in ControlLayers');
			}

			if (checked) {
				$mapStore.addLayer(tileLayer);
			}
			
			$controlLayerStore.addBaseLayer(tileLayer, layerName || 'Layer Name');
			$controlLayerStore.addTo($mapStore);
		} else {
			tileLayer.addTo($mapStore);
		}		
	}

	$: instance = tileLayer;

	function reset() {
		tileLayer?.remove();
		tileLayer = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
