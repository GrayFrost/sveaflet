---
layout: componentLayout
breadcrumb_title: Control
title: Control - Sveaflet
component_title: Control
dir: components
description: Vectors Layers - Control
---

L.Control is a base class for implementing map controls. Handles positioning. All other controls extend from this class.

## Setup

```svelte example csr hideOutput
<script>
	import { Control } from 'sveaflet';
</script>
```

## Default Control

```svelte example csr
<script>
	import { Map, TileLayer, Control } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13,
			zoomControl: false,
			attributionControl: false
		}}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Control>
			<div style="border:2px solid black;background:white;padding:8px;">Control content</div>
		</Control>
	</Map>
</div>
```

## Control with Options

```svelte example csr
<script>
	import { Map, TileLayer, Control } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let position = 'topright';
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={position} value="topright">Top Right</Radio>
	<Radio bind:group={position} value="bottomright">Bottom Right</Radio>
	<Radio bind:group={position} value="bottomleft">Bottom Left</Radio>
	<Radio bind:group={position} value="topleft">Top Left</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13,
			zoomControl: false,
			attributionControl: false
		}}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Control options={{ position }}>
			<div style="border:2px solid black;background:white;padding:8px;">Control content</div>
		</Control>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type             | Default                  |
| --------- | ------------ | ---------------- | ------------------------ |
| options   | **Optional** | `{position: ''}` | `{position: 'topright'}` |
