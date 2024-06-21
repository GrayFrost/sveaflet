---
layout: componentLayout
breadcrumb_title: TileLayer
title: TileLayer - Sveaflet
component_title: TileLayer
dir: Components
description: Raster Layers - TileLayer
---

sed to load and display tile layers on the map. Note that most tile servers require attribution, which you can set under [Layer](https://leafletjs.com/reference.html#layer). Extends [GridLayer](https://leafletjs.com/reference.html#gridlayer).

## Setup

```svelte example csr hideOutput
<script>
	import { TileLayer } from 'sveaflet';
</script>
```

## Default Tilelayer

```svelte example csr
<script>
	import { Map, TileLayer } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
```

## TileLayer with Options

```svelte example csr
<script>
	import { Map, TileLayer } from 'sveaflet';
	import { Label, Toggle } from 'flowbite-svelte';

	let enableOpacity = true;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Opacity:</Label>
	<Toggle bind:checked={enableOpacity} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer
			urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				opacity: enableOpacity ? 0.5 : 1
			}}
		/>
	</Map>
</div>
```

## Props

| Prop name   | Description  | Type                                                                      | Default |
| ----------- | ------------ | ------------------------------------------------------------------------- | ------- |
| urlTemplate | **Required** | string                                                                    |         |
| options     | **Optional** | [TileLayerOptions](https://leafletjs.com/reference.html#tilelayer-option) | `{}`    |
