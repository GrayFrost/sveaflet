---
layout: componentLayout
breadcrumb_title: Tooltip
title: Tooltip - Sveaflet
component_title: Tooltip
dir: components
description: UI Layers - Tooltip
---

Used to display small texts on top of map layers.

## Setup

```svelte example csr hideOutput
<script>
	import { Tooltip } from 'sveaflet';
</script>
```

## Default Tooltip

```svelte example csr
<script>
	import { Map, TileLayer, Tooltip } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
    <TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Tooltip latLng={[51.505, -0.09]} options={{ content: 'Tooltip Content.' }} />
	</Map>
</div>
```

## Tooltip with slot content

```svelte example csr
<script>
	import { Map, TileLayer, Tooltip } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Tooltip latLng={[51.505, -0.09]}>
			<div style="color:red;">Tooltip Content.</div>
		</Tooltip>
	</Map>
</div>
```

## Tooltip with Options

```svelte example csr
<script>
	import { Map, TileLayer, Circle, Tooltip } from 'sveaflet';
	import { Radio, Label, Input } from 'flowbite-svelte';

	let content = $state('Tooltip content.');
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Content:</Label>
	<Input type="text" bind:value={content} maxlength={20} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Tooltip latLng={[51.508, -0.11]} options={{ content }} />
	</Map>
</div>
```

## Tooltip in Layers

```svelte example csr
<script>
	import {
		Map,
		TileLayer,
		Tooltip,
		Marker,
		Circle,
		CircleMarker,
		Polygon,
		Polyline,
		Rectangle
	} from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latLng={[51.5, -0.09]}>
			<Tooltip options={{ content: 'Tooltip in Marker.' }} />
		</Marker>
		<Circle
			latLng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		>
			<Tooltip latLng={[51.508, -0.11]} options={{ content: 'Tooltip in Circle.' }} />
		</Circle>
		<CircleMarker latLng={[51.51, -0.13]} options={{ radius: 30, color: 'orange' }}>
			<Tooltip options={{ content: 'Tooltip in CircleMarker.' }} />
		</CircleMarker>
		<Polygon
			latLngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
		>
			<Tooltip options={{ content: 'Tooltip in Polygon.' }} />
		</Polygon>
		<Polyline
			latLngs={[
				[51.512, -0.09],
				[51.515, -0.1],
				[51.52, -0.11]
			]}
			options={{ color: 'purple' }}
			><Tooltip options={{ content: 'Tooltip in Polyline.' }} /></Polyline
		>
		<Rectangle
			bounds={[
				[51.49, -0.08],
				[51.5, -0.06]
			]}
			options={{ color: 'green' }}
			><Tooltip options={{ content: 'Tooltip in Rectangle.' }} /></Rectangle
		>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                  | Default |
| --------- | ------------ | --------------------------------------------------------------------- | ------- |
| latLng    | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng)                 |         |
| options   | **Optional** | [TooltipOptions](https://leafletjs.com/reference.html#tooltip-option) | `{}`    |
