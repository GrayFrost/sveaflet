---
layout: componentLayout
breadcrumb_title: Map
title: Map - Sveaflet
component_title: Map
dir: Components
description: Sveaflet Map Container
---

Root Component that wraps other all components.

## Setup

```svelte example csr hideOutput
<script>
	import { Map } from 'sveaflet';
</script>
```

## Default Map

A TileLayer is required. Options `{center, zoom}` are required.

```svelte example csr
<script>
	import { Map, TileLayer } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
```

## Map with Options

```svelte example csr
<script>
	import { Map, TileLayer } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map
		options={{ center: [51.505, -0.09], zoom: 13, zoomControl: false, attributionControl: false }}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
```

## Props

| Prop name | Description                                           | Type                                                          | Default |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------- | ------- |
| id        | **Optional**. DOM ID of a `<div>` element.            | String                                                        |         |
| options   | **Required**. At least provide center and zoom value. | [MapOptions](https://leafletjs.com/reference.html#map-option) | `{}`    |
