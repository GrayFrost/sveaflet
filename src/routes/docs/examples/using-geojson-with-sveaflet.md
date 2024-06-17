---
layout: componentLayout
breadcrumb_title: Using GeoJSON with Leaflet
title: Using GeoJSON with Leaflet
component_title: Using GeoJSON with Leaflet
dir: Examples
description: GeoJSON is a very popular data format among many GIS technologies and services — it's simple, lightweight, straightforward, and Leaflet is quite good at handling it. In this example, you'll learn how to create and interact with map vectors created from GeoJSON objects.
---

## Demo

```svelte example csr
<script>
	import { Map, GeoJSON } from 'sveaflet';

	let geojsonFeature = {
		type: 'Feature',
		properties: {
			name: 'Coors Field',
			amenity: 'Baseball Stadium',
			popupContent: 'This is where the Rockies play!'
		},
		geometry: {
			type: 'Point',
			coordinates: [-104.99404, 39.75621]
		}
	};
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.74739, -105], zoom: 13 }}>
		<GeoJSON json={geojsonFeature} />
	</Map>
</div>
```

// todo
