<script lang="ts">
	import { type LatLngExpression } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import TileLayer from '$lib/TileLayer.svelte';

	let latlng: LatLngExpression = [51.5, -0.09];
</script>

<Map>
	<TileLayer
		urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
		options={{
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}}
	/>
	<Marker {latlng} />
</Map>
