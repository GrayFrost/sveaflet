---
layout: componentLayout
breadcrumb_title: Rectangle
title: Rectangle - Sveaflet
component_title: Rectangle
dir: Components
description: Vector Layers - Rectangle
---

A component for drawing rectangle overlays on a map. Extends [Polygon](https://leafletjs.com/reference.html#polygon).

## Setup

```svelte example csr hideOutput
<script>
	import { Rectangle } from 'sveaflet';
</script>
```

## Default Rectangle

```svelte example csr
<script>
	import { Map, TileLayer, Rectangle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [55, -4.5], zoom: 6 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			latLngBounds={[
				[54.559322, -5.767822],
				[56.1210604, -3.02124]
			]}
		/>
	</Map>
</div>
```

## Rectangle with Options

```svelte example csr
<script>
	import { Map, TileLayer, Rectangle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [55, -4.5], zoom: 6 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			latLngBounds={[
				[54.559322, -5.767822],
				[56.1210604, -3.02124]
			]}
			options={{ color: '#ff7800' }}
		/>
	</Map>
</div>
```

## Rectangle with Popup

```svelte example csr
<script>
	import { Map, TileLayer, Rectangle, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [55, -4.5], zoom: 6 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			latLngBounds={[
				[54.559322, -5.767822],
				[56.1210604, -3.02124]
			]}
			options={{ color: '#ff7800' }}
		>
			<Popup options={{ content: 'Popup in Rectangle.' }} />
		</Rectangle>
	</Map>
</div>
```

## Props

| Prop name    | Description  | Type                                                                    | Default |
| ------------ | ------------ | ----------------------------------------------------------------------- | ------- |
| latLngBounds | **Required** | [LatLngBounds](https://leafletjs.com/reference.html#latlngbounds)       |         |
| options      | **Optional** | [PolylineOptions](https://leafletjs.com/reference.html#polyline-option) | `{}`    |
