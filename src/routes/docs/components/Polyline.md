---
layout: componentLayout
breadcrumb_title: Polyline
title: Polyline - Sveaflet
component_title: Polyline
dir: components
description: Vector Layers - Polyline
---

A component for drawing polyline overlays on a map. Extends [Path](https://leafletjs.com/reference.html#path).

## Setup

```svelte example csr hideOutput
<script>
	import { Polyline } from 'sveaflet';
</script>
```

## Default Polyline

```svelte example csr
<script>
	import { Map, TileLayer, Polyline } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [37.77, -122.43], zoom: 4 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Polyline
			latLngs={[
				[45.51, -122.68],
				[37.77, -122.43],
				[34.04, -118.2]
			]}
		/>
	</Map>
</div>
```

## Polyline with Options

```svelte example csr
<script>
	import { Map, TileLayer, Polyline } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let color = 'red';
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={color} value="red">Red</Radio>
	<Radio bind:group={color} value="green">Green</Radio>
	<Radio bind:group={color} value="blue">Blue</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [37.77, -122.43], zoom: 4 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Polyline
			latLngs={[
				[45.51, -122.68],
				[37.77, -122.43],
				[34.04, -118.2]
			]}
			options={{ color }}
		/>
	</Map>
</div>
```

## Polyline with Popup

```svelte example csr
<script>
	import { Map, TileLayer, Polyline, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [37.77, -122.43], zoom: 4 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Polyline
			latLngs={[
				[45.51, -122.68],
				[37.77, -122.43],
				[34.04, -118.2]
			]}
			options={{ color: 'yellow' }}
		>
			<Popup options={{ content: 'Popup in Polyline.' }} />
		</Polyline>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                    | Default |
| --------- | ------------ | ----------------------------------------------------------------------- | ------- |
| latLngs   | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng)[]                 |         |
| options   | **Optional** | [PolylineOptions](https://leafletjs.com/reference.html#polyline-option) | `{}`    |
