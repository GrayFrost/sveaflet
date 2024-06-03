<script lang="ts">
	import { type LatLngExpression, type LeafletMouseEvent } from 'leaflet';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import TileLayer from '$lib/TileLayer.svelte';
	import Circle from '$lib/Circle.svelte';
	import Polygon from '$lib/Polygon.svelte';
	import Polyline from '$lib/Polyline.svelte';
	import Rectangle from '$lib/Rectangle.svelte';
	import Popup from '$lib/Popup.svelte';
	import ControlZoom from '$lib/ControlZoom.svelte';
	import ControlAttribution from '$lib/ControlAttribution.svelte';
	import ControlScale from '$lib/ControlScale.svelte';
	import CircleMarker from '$lib/CircleMarker.svelte';
	import Tooltip from '$lib/Tooltip.svelte';
	import TileLayerWMS from '$lib/TileLayerWMS.svelte';

	let latlng: LatLngExpression = [51.5, -0.09];
	let circleLatlng: LatLngExpression = [51.508, -0.11];

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
				attributionControl: false
			}}
		>
			<!-- <TileLayer
		urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
		options={{
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}}
	/> -->
			<TileLayerWMS
				baseUrl="http://ows.mundialis.de/services/service?"
				options={{
					layers: 'TOPO-OSM-WMS'
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
			<!-- <Popup {latlng} options={{ content: '<p>Hello world!<br />This is a nice popup.</p>' }} /> -->
			<Marker {latlng}>
				<Popup options={{ content: '<p>Hello world!<br />This is a nice popup.</p>' }} />
			</Marker>

			<Marker latlng={[51.509, -0.08]}>
				<!-- <Popup options={{ content: '234' }} /> -->
				<Tooltip options={{ content: 'tooltip 234' }} />
			</Marker>
			<ControlZoom />
			<ControlAttribution
				options={{
					prefix: 'test attribution'
				}}
			/>
			<ControlScale />
			<CircleMarker latlng={circleLatlng} options={{ radius: 5 }} />
		</Map>
	</div>
</main>
