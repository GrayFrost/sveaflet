<script lang="ts">
	import { type LatLngExpression } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import TileLayer from '$lib/TileLayer.svelte';
	import Circle from '$lib/Circle.svelte';
	import Polygon from '$lib/Polygon.svelte';

	let latlng: LatLngExpression = [51.5, -0.09];
	let circleLatlng: LatLngExpression = [51.508, -0.11];
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
	<Circle
		latlng={circleLatlng}
		options={{
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 500
		}}
	/>
	<Polygon latlngs={[[51.509, -0.08], [51.503, -0.06], [51.51, -0.047]]} />
</Map>
