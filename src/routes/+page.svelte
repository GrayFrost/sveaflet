<script lang="ts">
	import { type LatLngExpression } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import TileLayer from '$lib/TileLayer.svelte';
	import Circle from '$lib/Circle.svelte';
	import Polygon from '$lib/Polygon.svelte';
	import Polyline from '$lib/Polyline.svelte';
	import Rectangle from '$lib/Rectangle.svelte';
	import Popup from '$lib/Popup.svelte';

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
	<!-- <Popup options={{ content: '<p>Hello world!<br />This is a nice popup.</p>' }}>
		<Marker {latlng} />
	</Popup> -->
	<Circle
		latlng={circleLatlng}
		options={{
			color: 'red',
			fillColor: '#f03',
			fillOpacity: 0.5,
			radius: 500
		}}
	/>
	<Polygon
		latlngs={[
			[51.509, -0.08],
			[51.503, -0.06],
			[51.51, -0.047]
		]}
	/>
	<Polyline
		latlngs={[
			[45.51, -122.68],
			[37.77, -122.43],
			[34.04, -118.2]
		]}
		options={{ color: 'yellow' }}
	/>
	<Rectangle
		latLngBounds={[
			[54.559322, -5.767822],
			[56.1210604, -3.02124]
		]}
		options={{ color: '#ff7800', weight: 1 }}
	/>
	<Popup {latlng} options={{ content: '<p>Hello world!<br />This is a nice popup.</p>' }} />
</Map>
