---
layout: componentLayout
breadcrumb_title: Scale
title: ControlScale - Sveaflet
component_title: ControlScale
dir: Components
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
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
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

	let maxWidth = 100;
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={maxWidth} value={100}>100</Radio>
	<Radio bind:group={maxWidth} value={300}>300</Radio>
	<Radio bind:group={maxWidth} value={500}>500</Radio>
</div>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlScale options={{ maxWidth }} />
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                              | Default |
| --------- | ------------ | --------------------------------------------------------------------------------- | ------- |
| options   | **Optional** | [Control.ScaleOptions](https://leafletjs.com/reference.html#control-scale-option) | `{}`    |
