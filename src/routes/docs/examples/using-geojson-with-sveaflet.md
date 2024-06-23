---
layout: componentLayout
breadcrumb_title: using-geojson-with-sveaflet
title: Using GeoJSON with Leaflet
component_title: Using GeoJSON with Leaflet
dir: examples
description: GeoJSON is a very popular data format among many GIS technologies and services — it's simple, lightweight, straightforward, and Leaflet is quite good at handling it. In this example, you'll learn how to create and interact with map vectors created from GeoJSON objects.
---

## Example

```svelte example csr
<script>
	import { Map, TileLayer, GeoJSON, Icon } from 'sveaflet';
	import L from 'leaflet';
	import { bicycleRental, campus, freeBus, coorsField } from '../assets/sample-geojson.js';

	const baseballIcon = L.icon({
		iconUrl: '/images/baseball-marker.png',
		iconSize: [32, 37],
		iconAnchor: [16, 37],
		popupAnchor: [0, -28]
	});

	function onEachFeature(feature, layer) {
		let popupContent = `<p>I started out as a GeoJSON ${feature.geometry.type}, but now I'm a Leaflet vector!</p>`;

		if (feature.properties && feature.properties.popupContent) {
			popupContent += feature.properties.popupContent;
		}

		layer.bindPopup(popupContent);
	}
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.74739, -105], zoom: 13 }}>
		<TileLayer
			urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}}
		/>
		<GeoJSON
			json={[bicycleRental, campus]}
			options={{
				style(feature) {
					return feature.properties && feature.properties.style;
				},
				onEachFeature,
				pointToLayer(feature, latlng) {
					return L.circleMarker(latlng, {
						radius: 8,
						fillColor: '#ff7800',
						color: '#000',
						weight: 1,
						opacity: 1,
						fillOpacity: 0.8
					});
				}
			}}
		/>
		<GeoJSON
			json={freeBus}
			options={{
				filter(feature, layer) {
					if (feature.properties) {
						// If the property "underConstruction" exists and is true, return false (don't render features under construction)
						return feature.properties.underConstruction !== undefined
							? !feature.properties.underConstruction
							: true;
					}
					return false;
				},
				onEachFeature
			}}
		/>
		<GeoJSON
			json={coorsField}
			options={{
				pointToLayer(feature, latlng) {
					return L.marker(latlng, { icon: baseballIcon });
				},
				onEachFeature
			}}
		/>
	</Map>
</div>
```
