---
layout: componentLayout
breadcrumb_title: Map
title: Map - Sveaflet
component_title: Map
dir: components
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
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
```

## Map with Options

```svelte example csr
<script>
	import { Map, TileLayer } from 'sveaflet';
	import { Input, Label } from 'flowbite-svelte';

	let zoom = $state(13);
</script>

<div class="flex items-center gap-4 mb-4">
	<Label class="w-24">Zoom Level:</Label>
	<Input type="number" bind:value={zoom} />
</div>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom, zoomControl: false, attributionControl: false }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
```

## Props

| Prop name | Description                                           | Type                                                          | Default |
| --------- | ----------------------------------------------------- | ------------------------------------------------------------- | ------- |
| id        | **Optional**. DOM ID of a `<div>` element.            | String                                                        |         |
| options   | **Required**. At least provide center and zoom value. | [MapOptions](https://leafletjs.com/reference.html#map-option) | `{}`    |
