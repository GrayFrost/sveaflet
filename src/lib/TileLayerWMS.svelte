<script lang="ts">
	import { TileLayer, type WMSOptions } from 'leaflet';
  import { useConsumeMap } from './context.ts';

	export let baseUrl: string;
	export let options: WMSOptions = {};
	
	let { map: mapStore, removeDefaultLayer } = useConsumeMap();

	if ($mapStore) {
		removeDefaultLayer();
		let tailLayerWMS = new TileLayer.WMS(baseUrl, options);
		tailLayerWMS.addTo($mapStore);
	}
</script>
