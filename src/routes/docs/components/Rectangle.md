---
layout: componentLayout
breadcrumb_title: Rectangle
title: Rectangle - Sveaflet
component_title: Rectangle
dir: components
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
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			bounds={[
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
	import { Radio } from 'flowbite-svelte';

	let color = 'red';
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={color} value="red">Red</Radio>
	<Radio bind:group={color} value="green">Green</Radio>
	<Radio bind:group={color} value="blue">Blue</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [55, -4.5], zoom: 6 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			bounds={[
				[54.559322, -5.767822],
				[56.1210604, -3.02124]
			]}
			options={{ color }}
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
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			bounds={[
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

| Prop name | Description  | Type                                                                    | Default |
| --------- | ------------ | ----------------------------------------------------------------------- | ------- |
| bounds    | **Required** | [LatLngBounds](https://leafletjs.com/reference.html#latLngbounds)       |         |
| options   | **Optional** | [PolylineOptions](https://leafletjs.com/reference.html#polyline-option) | `{}`    |
