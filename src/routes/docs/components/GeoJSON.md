---
breadcrumb_title: Sveaflet
title: Sveaflet
component_title: GeoJSON
dir: Components
description: GeoJSON
---

# geojson

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

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [39.74739, -105], zoom: 13 }}>
		<GeoJSON json={geojsonFeature} />
	</Map>
</div>
```
