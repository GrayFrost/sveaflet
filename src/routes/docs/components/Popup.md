---
layout: componentLayout
breadcrumb_title: Popup
title: Popup - Sveaflet
component_title: Popup
dir: Components
description: UI Layers - Popup
---

Used to open popups in certain places of the map.

## Setup

```svelte example csr hideOutput
<script>
	import { Popup } from 'sveaflet';
</script>
```

## Default Popup

```svelte example csr
<script>
	import { Map, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Popup latlng={[51.5, -0.09]} />
	</Map>
</div>
```

## Popup with slot content

```svelte example csr
<script>
	import { Map, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Popup latlng={[51.5, -0.09]}>
			<div style="color:red;">Popup Content.</div>
		</Popup>
	</Map>
</div>
```

## Popup with Options

```svelte example csr
<script>
	import { Map, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Popup latlng={[51.5, -0.09]} options={{ content: 'Pop content.' }} />
	</Map>
</div>
```

## Popup in Layers

```svelte example csr
<script>
	import { Map, Marker, Circle, Polygon, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
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
		<Polygon
			latlngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
		>
			<Popup options={{ content: 'Popup in Polygon.' }} />
		</Polygon>
	</Map>
</div>
```
