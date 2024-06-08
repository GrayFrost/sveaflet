<script lang="ts">
	import { TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let urlTemplate: string;
	export let options: TileLayerOptions;

	let { map: mapStore, removeDefaultLayer } = useConsumeMap();

	if ($mapStore) {
		removeDefaultLayer();
		let tileLayer = new TileLayer(urlTemplate, options);
		tileLayer.addTo($mapStore);
	}
</script>
