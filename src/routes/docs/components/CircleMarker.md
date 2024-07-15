---
layout: componentLayout
breadcrumb_title: CircleMarker
title: CircleMarker - Sveaflet
component_title: CircleMarker
dir: components
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
	import { Map, TileLayer, CircleMarker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<CircleMarker latLng={[51.508, -0.11]} />
	</Map>
</div>
```

## CircleMarker with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, CircleMarker } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let color = 'red';
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={color} value="red">Red</Radio>
	<Radio bind:group={color} value="green">Green</Radio>
	<Radio bind:group={color} value="blue">Blue</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<CircleMarker latLng={[51.508, -0.11]} options={{ radius: 20, color }} />
	</Map>
</div>
```

## CircleMarker with Popup

```svelte example csr
<script>
	import { Map, TileLayer, CircleMarker, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<CircleMarker latLng={[51.508, -0.11]} options={{ radius: 20 }}>
			<Popup options={{ content: 'Popup in CircleMarker.' }} />
		</CircleMarker>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                            | Default          |
| --------- | ------------ | ------------------------------------------------------------------------------- | ---------------- |
| latLng    | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng)                           |                  |
| options   | **Optional** | [CircleMarkerOptions](https://leafletjs.com/reference.html#circlemarker-option) | `{ radius: 10 }` |

