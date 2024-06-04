<script lang="ts">
	import { TileLayer, type TileLayerOptions } from 'leaflet?client';
	import { useConsumeMap } from './context.ts';

	export let urlTemplate: string;
	export let options: TileLayerOptions;

	let mapStore = useConsumeMap();

	if ($mapStore) {
		let tileLayer = new TileLayer(urlTemplate, options);
		tileLayer.addTo($mapStore);
	}
</script>
