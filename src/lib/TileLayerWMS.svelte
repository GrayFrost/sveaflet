<script lang="ts">
	import { onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { WMSOptions } from 'leaflet';
	import { useConsumeMap, useConsumeControlLayer } from './context.ts';

	export let baseUrl: string;
	export let options: WMSOptions = {};
	export let layerName: string = '';
	export let checked: boolean = false;

	let { map: mapStore, removeDefaultLayer } = useConsumeMap();
	let controlLayerStore = useConsumeControlLayer();

	let tileLayerWMS: TileLayer | undefined;

	$: if ($mapStore) {
		removeDefaultLayer();
		tileLayerWMS = new TileLayer.WMS(baseUrl, options);

		if ($controlLayerStore) {
			if (!layerName) {
				console.warn('Layer Name is required in ControlLayers');
			}

			if (checked) {
				$mapStore.addLayer(tileLayerWMS);
			}
			$controlLayerStore.addBaseLayer(tileLayerWMS, layerName || 'Layer Name');
			$controlLayerStore.addTo($mapStore);
		} else {
			tileLayerWMS.addTo($mapStore);
		}
	}

	onDestroy(() => {
		tileLayerWMS?.remove();
		tileLayerWMS = undefined;
	});
</script>
