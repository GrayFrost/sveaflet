---
layout: componentLayout
breadcrumb_title: Circle
title: Circle - Sveaflet
component_title: Circle
dir: Components
description: Vectors Layers - Circle
---

A component for drawing circle overlays on a map. Extends [CircleMarker](https://leafletjs.com/reference.html#circlemarker).

It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).

## Setup

```svelte example csr hideOutput
<script>
	import { Circle } from 'sveaflet';
</script>
```

## Default Circle

```svelte example csr
<script>
	import { Map, Circle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Circle
			latlng={[51.508, -0.11]}
		/>
	</Map>
</div>
```

## Circle with Options

```svelte example csr
<script>
	import { Map, Circle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		/>
	</Map>
</div>
```

## Circle with Popup

```svelte example csr
<script>
	import { Map, Circle, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
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
	</Map>
</div>
```

## Props

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| latlng | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng) | |
| options | **Optional** | [CircleOptions](https://leafletjs.com/reference.html#circle-option) | `{ radius: 100 }` |

## Events
