---
layout: componentLayout
breadcrumb_title: SVGOverlay
title: SVGOverlay - Sveaflet
component_title: SVGOverlay
dir: Components
description: Raster Layers - SVGOverlay
---

// todo

## Setup

```svelte example csr hideOutput
<script>
	import { SVGOverlay } from 'sveaflet';
</script>
```

## Default SVGOverlay

```svelte example csr
<script>
	import { Map, TileLayer, SVGOverlay } from 'sveaflet';
</script>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [32, -130], zoom: 4 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<SVGOverlay
			bounds={[
				[32, -130],
				[13, -100]
			]}
		>
			<rect width="200" height="200" />
			<rect x="75" y="23" width="50" height="50" style="fill:red" />
			<rect x="75" y="123" width="50" height="50" style="fill:#0013ff" />
		</SVGOverlay>
	</Map>
</div>
```

## SVGOverlay with Options

// todo 不生效

```svelte example csr
<script>
	import { Map, TileLayer, SVGOverlay } from 'sveaflet';
	import { Label, Toggle } from 'flowbite-svelte';

	let enableOpacity = true;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Opacity:</Label>
	<Toggle bind:checked={enableOpacity} />
</div>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [32, -130], zoom: 4 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<SVGOverlay
			bounds={[
				[32, -130],
				[13, -100]
			]}
			options={{
				opacity: enableOpacity ? 0.5 : 1
			}}
		>
			<rect width="200" height="200" />
			<rect x="75" y="23" width="50" height="50" style="fill:red" />
			<rect x="75" y="123" width="50" height="50" style="fill:#0013ff" />
		</SVGOverlay>
	</Map>
</div>
```

## Props

// todo doc
