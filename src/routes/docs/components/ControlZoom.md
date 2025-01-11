---
layout: componentLayout
breadcrumb_title: Zoom
title: ControlZoom - Sveaflet
component_title: ControlZoom
dir: components
description: Controls - Zoom
---

A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its [zoomControl option](https://leafletjs.com/reference.html#map-zoomcontrol) to false. Extends [Control](https://leafletjs.com/reference.html#control).

## Setup

```svelte example csr hideOutput
<script>
	import { ControlZoom } from 'sveaflet';
</script>
```

## Default ControlZoom

```svelte example csr
<script>
	import { Map, TileLayer, ControlZoom } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlZoom />
	</Map>
</div>
```

## ControlZoom with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, ControlZoom } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let position = $state('topright');
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={position} value="topright">Top Right</Radio>
	<Radio bind:group={position} value="bottomright">Bottom Right</Radio>
	<Radio bind:group={position} value="bottomleft">Bottom Left</Radio>
	<Radio bind:group={position} value="topleft">Top Left</Radio>
</div>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlZoom options={{ position }} />
	</Map>
</div>
```

## Hide default Zoom

```svelte example csr
<script>
	import { Map, TileLayer, ControlZoom } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13, zoomControl: false }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlZoom />
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                            | Default |
| --------- | ------------ | ------------------------------------------------------------------------------- | ------- |
| options   | **Optional** | [Control.ZoomOptions](https://leafletjs.com/reference.html#control-zoom-option) | `{}`    |
