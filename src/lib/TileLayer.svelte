<script lang="ts">
	import { onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let urlTemplate: string;
	export let options: TileLayerOptions;

	let { map: mapStore, removeDefaultLayer } = useConsumeMap();

	let tileLayer: TileLayer | undefined;

	if ($mapStore) {
		removeDefaultLayer();
		tileLayer = new TileLayer(urlTemplate, options);
		tileLayer.addTo($mapStore);
	}

	onDestroy(() => {
		tileLayer?.remove();
		tileLayer = undefined;
	})
</script>
