---
layout: componentLayout
breadcrumb_title: GeoJSON
title: GeoJSON - Sveaflet
component_title: GeoJSON
dir: Components
description: Other Layers - GeoJSON
---

Represents a GeoJSON object or an array of GeoJSON objects. Allows you to parse GeoJSON data and display it on the map. Extends [FeatureGroup](https://leafletjs.com/reference.html#featuregroup).

## Setup

```svelte example csr hideOutput
<script>
	import { GeoJSON } from 'sveaflet';
</script>
```

## Default GeoJSON

```svelte example csr
<script>
	import { Map, TileLayer, GeoJSON } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.74739, -105], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<GeoJSON />
	</Map>
</div>
```

## GeoJSON with Options

// todo optios
```svelte example csr
<script>
	import { Map, TileLayer, GeoJSON } from 'sveaflet';

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
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<GeoJSON json={geojsonFeature} />
	</Map>
</div>
```

## Props

| Prop name | Description                                                                                 | Type                                                                  | Default |
| --------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------- |
| json      | **Optional**. An object in [GeoJSON format](https://datatracker.ietf.org/doc/html/rfc7946). | Object                                                                | null    |
| options   | **Optional**                                                                                | [GeoJSONOptions](https://leafletjs.com/reference.html#geojson-option) | null    |
