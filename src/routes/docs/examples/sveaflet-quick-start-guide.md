---
layout: componentLayout
breadcrumb_title: Sveaflet Quick Start Guide
title: Sveaflet Quick Start Guide
component_title: Sveaflet Quick Start Guide
dir: Examples
description: This step-by-step guide will quickly get you started on Leaflet basics, including setting up a Leaflet map, working with markers, polylines and popups, and dealing with events.
---

## Demo

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Circle, Polygon, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height:500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer
			urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}}
		/>
		<Popup latlng={[51.513, -0.09]} options={{ content: 'I am a standalone popup.' }} />
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
			latlngs={[
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

// todo click events
