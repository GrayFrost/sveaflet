---
layout: componentLayout
breadcrumb_title: CircleMarker
title: CircleMarker - Sveaflet
component_title: CircleMarker
dir: Components
description: Vectors Layers - CircleMarker
---

A circle of a fixed size with radius specified in pixels. Extends [Path](https://leafletjs.com/reference.html#path).

## Setup

```svelte exampel csr hideOutput
<script>
	import { CircleMarker } from 'sveaflet';
</script>
```

## Default CircleMarker

```svelte example csr
<script>
	import { Map, CircleMarker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<CircleMarker latlng={[51.508, -0.11]} options={{ radius: 20, color: 'purple' }} />
	</Map>
</div>
```

## CircleMarker with Popup

```svelte example csr
<script>
	import { Map, CircleMarker, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<CircleMarker latlng={[51.508, -0.11]} options={{ radius: 20 }}>
			<Popup options={{ content: 'Popup in CircleMarker.' }} />
		</CircleMarker>
	</Map>
</div>
```

## Props

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| latlng    |  | [LatLng](https://leafletjs.com/reference.html#latlng) | |
| options   |  | [CircleMarkerOptions](https://leafletjs.com/reference.html#circlemarker-option) | `{ radius: 1 }` |

## Events