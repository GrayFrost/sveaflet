---
layout: componentLayout
breadcrumb_title: sveaflet-quick-start-guide
title: Sveaflet Quick Start Guide
component_title: Sveaflet Quick Start Guide
dir: examples
description: This step-by-step guide will quickly get you started on Leaflet basics, including setting up a Leaflet map, working with markers, polylines and popups, and dealing with events.
---

## Example

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Circle, Polygon, Popup } from 'sveaflet';

	let map;
	let popup;
	$: popupLatLng = [51.513, -0.09];
	$: popupContent = 'I am a standalone popup.';

	$: if (map) {
		map.on('click', onMapClick);
	}

	function onMapClick(e) {
		popupLatLng = e.latlng;
		popupContent = 'You clicked the map at ' + e.latlng.toString();
		if (popup) {
			popup.openOn(map);
		}
	}
</script>

<div style="width: 100%;height:500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }} bind:instance={map}>
		<TileLayer
			urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}}
		/>
		<Popup latlng={popupLatLng} options={{ content: popupContent }} />

		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		>
			<Popup options={{ content: 'I am a circle.' }} />
		</Circle>
		<Marker latlng={[51.5, -0.09]}>
			<Popup options={{ content: '<b>Hello world!</b><br>I am a popup.' }} />
		</Marker>
		<Polygon
			latLngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
		>
			<Popup options={{ content: 'I am a polygon.' }} />
		</Polygon>
	</Map>
</div>
```
