<script lang="ts">
	import { onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { WMSOptions } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let baseUrl: string;
	export let options: WMSOptions = {};

	let { map: mapStore, removeDefaultLayer } = useConsumeMap();

	let tileLayerWMS: TileLayer | undefined;

	if ($mapStore) {
		removeDefaultLayer();
		tileLayerWMS = new TileLayer.WMS(baseUrl, options);
		tileLayerWMS.addTo($mapStore);
	}

	onDestroy(() => {
		tileLayerWMS?.remove();
		tileLayerWMS = undefined;
	})
</script>
