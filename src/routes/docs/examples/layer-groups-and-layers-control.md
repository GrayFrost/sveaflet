---
layout: componentLayout
breadcrumb_title: Layer Groups and Layers Control
title: Layer Groups and Layers Control
component_title: Layer Groups and Layers Control
dir: Examples
description: This tutorial will show you how to group several layers into one, and how to use the layers control to allow users to easily switch different layers on your map.
---

## Example

```svelte example csr
<script>
	import { Map, ControlLayers, TileLayer, LayerGroup, Marker, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [39.73, -104.99],
			zoom: 10
		}}
	>
		<ControlLayers>
			<TileLayer
				layerName="OpenStreetMap"
				urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				}}
				checked={true}
			/>
			<TileLayer
				layerName="OpenStreetMap.HOT"
				urlTemplate={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
				}}
			/>
			<TileLayer
				layerName="OpenTopoMap"
				urlTemplate={'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution:
						'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
				}}
			/>

			<LayerGroup checked={true} overlayName="Cities">
				<Marker latlng={[39.61, -105.02]}>
					<Popup options={{ content: 'This is Littleton, CO.' }} />
				</Marker>
				<Marker latlng={[39.74, -104.99]}>
					<Popup options={{ content: 'This is Denver, CO.' }} />
				</Marker>
				<Marker latlng={[39.73, -104.8]}>
					<Popup options={{ content: 'This is Aurora, CO.' }} />
				</Marker>
				<Marker latlng={[39.77, -105.23]}>
					<Popup options={{ content: 'This is Golden, CO.' }} />
				</Marker>
			</LayerGroup>
			<LayerGroup overlayName="Parks">
				<Marker latlng={[39.75, -105.09]}>
					<Popup options={{ content: 'This is Crown Hill Park.' }} />
				</Marker>
				<Marker latlng={[39.68, -105.0]}>
					<Popup options={{ content: 'This is Ruby Hill Park.' }} />
				</Marker>
			</LayerGroup>
		</ControlLayers>
	</Map>
</div>
```

## All layers in a LayerGroup

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
	import { Button, Label } from 'flowbite-svelte';

	let layerGroup;

	let layers = [];

	let index = 0;

	$: if (layerGroup) {
		layerGroup.eachLayer((layer) => {
			layers.push(layer);
		});
	}

	function openPopup() {
		if (layers.length) {
			layers[index % layers.length].openPopup();
		}
		index++;
	}
</script>

<div class="flex items-center mb-4 gap-4">
	<Button on:click={openPopup}>Open Popup</Button>
	<Label>one by one</Label>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<LayerGroup bind:instance={layerGroup}>
			<Marker latlng={[51.5, -0.09]}>
				<Popup options={{ content: 'Popup in Marker.' }} />
			</Marker>
			<Circle
				latlng={[51.508, -0.11]}
				options={{
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 500
				}}
			>
				<Popup options={{ content: 'Popup in Circle.' }} />
			</Circle>
			<CircleMarker latlng={[51.51, -0.13]} options={{ radius: 30, color: 'orange' }}>
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
