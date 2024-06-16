---
layout: componentLayout
breadcrumb_title: ImageOverlay
title: ImageOverlay - Sveaflet
component_title: ImageOverlay
dir: Components
description: Raster Layers - ImageOverlay
---

Used to load and display a single image over specific bounds of the map. Extends [Layer](https://leafletjs.com/reference.html#layer).

## Setup

```svelte example csr hideOutput
<script>
	import { ImageOverlay } from 'sveaflet';
</script>
```

## Default ImageOverlay

```svelte example csr
<script>
	import { Map, ImageOverlay } from 'sveaflet';
</script>

<div style="width: 100%; height: 500px;">
	<Map options={{ center: [40.799311, -74.33], zoom: 10 }}>
		<ImageOverlay
			imageUrl="https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
			bounds={[
				[40.799311, -74.118464],
				[40.68202047785919, -74.33]
			]}
		/>
	</Map>
</div>
```

## Props
| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| imageUrl |  | String |  |
| bounds |  | [LatLngBounds](https://leafletjs.com/reference.html#latlngbounds) |  |
| options |  | [ImageOverlayOptions](https://leafletjs.com/reference.html#imageoverlay-option) | `{}` |