<script lang="ts">
	import { onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import { useConsumeMap, useConsumeControl } from './context.ts';

	export let urlTemplate: string;
	export let options: TileLayerOptions = {};
	export let layerName: string = '';

	let { map: mapStore, removeDefaultLayer } = useConsumeMap();
	let controlStore = useConsumeControl();

	let tileLayer: TileLayer | undefined;

	if ($mapStore) {
		removeDefaultLayer();
		tileLayer = new TileLayer(urlTemplate, options);
		tileLayer.addTo($mapStore);

		if ($controlStore) {
			if (!layerName) {
				console.warn('Layer Name is required in ControlLayers');
			} else {
				$controlStore.addBaseLayer(tileLayer, layerName);
			}
		}
	}

	onDestroy(() => {
		tileLayer?.remove();
		tileLayer = undefined;
	});
</script>
