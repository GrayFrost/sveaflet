---
layout: componentLayout
breadcrumb_title: SVGOverlay
title: SVGOverlay - Sveaflet
component_title: SVGOverlay
dir: Components
description: Vector Layers - SVGOverlay
---

Used to load, display and provide DOM access to an SVG file over specific bounds of the map. Extends [ImageOverlay](https://leafletjs.com/reference.html#imageoverlay).

An SVG overlay uses the [`<svg>`](https://developer.mozilla.org/docs/Web/SVG/Element/svg) element.

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

```svelte example csr
<script>
	import { Map, TileLayer, SVGOverlay } from 'sveaflet';
	import { Label, Toggle } from 'flowbite-svelte';

	let enableOpacity = true;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Enable Opacity:</Label>
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

| Prop name    | Description  | Type                                                                    | Default |
| ------------ | ------------ | ----------------------------------------------------------------------- | ------- |
| bounds | **Required** | [LatLngBounds](https://leafletjs.com/reference.html#latlngbounds)       |         |
| options      | **Optional** | [ImageOverlayOptions](https://leafletjs.com/reference.html#imageoverlay-option) | `{}`    |
