---
layout: componentLayout
breadcrumb_title: Polygon
title: Polygon - Sveaflet
component_title: Polygon
dir: components
description: Vector Layers - Polygon
---

A component for drawing polygon overlays on a map. Extends [Polyline](https://leafletjs.com/reference.html#polyline).

Note that points you pass when creating a polygon shouldn't have an additional last point equal to the first one — it's better to filter out such points.

## Setup

```svelte example csr hideOutput
<script>
	import { Polygon } from 'sveaflet';
</script>
```

## Default Polygon

```svelte example csr
<script>
	import { Map, TileLayer, Polygon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.503, -0.06], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Polygon
			latLngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
		/>
	</Map>
</div>
```

## Polygon with Options

```svelte example csr
<script>
	import { Map, TileLayer, Polygon } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let color = $state('red');
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={color} value="red">Red</Radio>
	<Radio bind:group={color} value="green">Green</Radio>
	<Radio bind:group={color} value="blue">Blue</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.503, -0.06], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Polygon
			latLngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
			options={{
				color
			}}
		/>
	</Map>
</div>
```

## Polygon with Popup

```svelte example csr
<script>
	import { Map, TileLayer, Polygon, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.503, -0.06], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Polygon
			latLngs={[
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

## Props

| Prop name | Description  | Type                                                                    | Default |
| --------- | ------------ | ----------------------------------------------------------------------- | ------- |
| latLngs   | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng)[]                 |         |
| options   | **Optional** | [PolylineOptions](https://leafletjs.com/reference.html#polyline-option) | `{}`    |
