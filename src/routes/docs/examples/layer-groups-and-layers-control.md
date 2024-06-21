---
breadcrumb_title: Layer Groups and Layers Control
title: Layer Groups and Layers Control
component_title: Layer Groups and Layers Control
dir: Examples
description: Layer Groups and Layers Control
---

# Layer Groups and Layers Control

```svelte example csr
<script>
	import { Map, TileLayer, LayerGroup, Marker, Popup } from 'sveaflet';
</script>

<div style="width:700px;height:500px">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 10
		}}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<LayerGroup>
			<Marker latLng={[39.61, -105.02]}>
				<Popup options={{ content: 'This is Littleton, CO.' }} />
			</Marker>
			<Marker latLng={[39.74, -104.99]}>
				<Popup options={{ content: 'This is Denver, CO.' }} />
			</Marker>
			<Marker latLng={[39.73, -104.8]}>
				<Popup options={{ content: 'This is Aurora, CO.' }} />
			</Marker>
			<Marker latLng={[39.77, -105.23]}>
				<Popup options={{ content: 'This is Golden, CO.' }} />
			</Marker>
		</LayerGroup>
	</Map>
</div>
```

```svelte example csr
<script>
	import {
		Map,
		TileLayer,
		LayerGroup,
		Popup,
		Marker,
		Circle,
		CircleMarker,
		Polygon,
		Polyline,
		Rectangle
	} from 'sveaflet';

	let layerGroup;

	let layers = [];

	let index = 0;

	$: if (layerGroup) {
		layerGroup.eachLayer((layer) => {
			layers.push(layer)
		});
	}

	function openPopup() {
		if (layers.length) {
			layers[index % layers.length].openPopup();
		}
		index++;
	}
</script>

<button on:click={openPopup}>open popup</button>
<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<LayerGroup bind:instance={layerGroup}>
			<Marker latLng={[51.5, -0.09]}>
				<Popup options={{ content: 'Popup in Marker.' }} />
			</Marker>
			<Circle
				latLng={[51.508, -0.11]}
				options={{
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 500
				}}
			>
				<Popup options={{ content: 'Popup in Circle.' }} />
			</Circle>
			<CircleMarker latLng={[51.51, -0.13]} options={{ radius: 30, color: 'orange' }}>
				<Popup options={{ content: 'Popup in CircleMarker.' }} />
			</CircleMarker>
			<Polygon
				latLngs={[
					[51.509, -0.08],
					[51.503, -0.06],
					[51.51, -0.047]
				]}
			>
				<Popup options={{ content: 'Popup in Polygon.' }} />
			</Polygon>
			<Polyline
				latLngs={[
					[51.512, -0.09],
					[51.515, -0.1],
					[51.52, -0.11]
				]}
				options={{ color: 'purple' }}
				><Popup options={{ content: 'Popup in Polyline.' }} /></Polyline
			>
			<Rectangle
				latLngBounds={[
					[51.49, -0.08],
					[51.5, -0.06]
				]}
				options={{ color: 'green' }}
				><Popup options={{ content: 'Popup in Rectangle.' }} /></Rectangle
			>
		</LayerGroup>
	</Map>
</div>
```
