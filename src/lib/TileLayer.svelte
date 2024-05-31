<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TileLayer, type TileLayerOptions } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let urlTemplate: string;
	export let options: TileLayerOptions;

	let mapStore = useConsumeMap();

	if ($mapStore) {
		let tileLayer = new TileLayer(urlTemplate, options);
		tileLayer.addTo($mapStore);
	}
</script>
