---
layout: componentLayout
breadcrumb_title: Scale
title: ControlScale - Sveaflet
component_title: ControlScale
dir: components
description: Controls - Scale
---

A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends [Control](https://leafletjs.com/reference.html#control).

## Setup

```svelte example csr hideOutput
<script>
	import { ControlScale } from 'sveaflet';
</script>
```

## Default ControlScale

```svelte example csr
<script>
	import { Map, TileLayer, ControlScale } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlScale />
	</Map>
</div>
```

## ControlScale with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, ControlScale } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let position = 'topright';
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
		<ControlScale options={{ position }} />
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                              | Default |
| --------- | ------------ | --------------------------------------------------------------------------------- | ------- |
| options   | **Optional** | [Control.ScaleOptions](https://leafletjs.com/reference.html#control-scale-option) | `{}`    |
