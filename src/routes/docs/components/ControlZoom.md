---
layout: componentLayout
breadcrumb_title: Zoom
title: ControlZoom - Sveaflet
component_title: ControlZoom
dir: Components
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
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlZoom />
	</Map>
</div>
```

## ControlZoom with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, ControlZoom } from 'sveaflet';

	const zoomInTexts = ['W', 'A'];
	const zoomOutTexts = ['X', 'D'];
	let index = 0;

	onMount(() => {
		let interval = window.setInterval(() => {
			index++;
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	});

	$: zoomInText = zoomInTexts[index % zoomInTexts.length];
	$: zoomOutText = zoomOutTexts[index % zoomOutTexts.length];
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlZoom options={{ zoomInText, zoomOutText }} />
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
		<ControlZoom />
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                            | Default |
| --------- | ------------ | ------------------------------------------------------------------------------- | ------- |
| options   | **Optional** | [Control.ZoomOptions](https://leafletjs.com/reference.html#control-zoom-option) | `{}`    |
