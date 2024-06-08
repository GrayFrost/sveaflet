<script lang="ts">
	import { type LatLngExpression, type LeafletMouseEvent } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import TileLayerWMS from '$lib/TileLayerWMS.svelte';

	let latlng: LatLngExpression = [51.5, -0.09];

	const onMapClick = (e: CustomEvent<LeafletMouseEvent>) => {
		console.log('on map click', e.detail);
	};
</script>

<main
	class="flex-auto min-w-0 lg:static lg:max-h-full lg:overflow-visible divide-y dark:divide-gray-700"
>
	<div class="w-[500px] h-[500px]">
		<Map
			on:click={onMapClick}
			options={{
				attributionControl: false,
				center: [51.5, -0.09],
				zoom: 4
			}}
		>
			<!-- <TileLayerWMS
				baseUrl="http://ows.mundialis.de/services/service?"
				options={{
					layers: 'TOPO-OSM-WMS'
				}}
			/> -->

			<Marker latlng={[51.509, -0.08]}>
				<!-- <Popup options={{ content: '234' }} /> -->
				<Tooltip options={{ content: 'tooltip 234' }} />
			</Marker>
		</Map>
	</div>
</main>
