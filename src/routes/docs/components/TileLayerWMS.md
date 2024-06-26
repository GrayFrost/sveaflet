---
layout: componentLayout
breadcrumb_title: TileLayerWMS
title: TileLayerWMS - Sveaflet
component_title: TileLayerWMS
dir: components
description: TileLayerWMS
---

Used to display [WMS](https://en.wikipedia.org/wiki/Web_Map_Service) services as tile layers on the map. Extends [TileLayer](https://leafletjs.com/reference.html#tilelayer).

## Setup

```svelte example csr hideOutput
<script>
	import { TileLayerWMS } from 'sveaflet';
</script>
```

## Default TileLayerWMS

```svelte example csr
<script>
	import { Map, TileLayerWMS } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayerWMS
			baseUrl="http://ows.mundialis.de/services/service?"
			options={{
				layers: 'TOPO-OSM-WMS'
			}}
		/>
	</Map>
</div>
```

## TileLayerWMS with Options

```svelte example csr
<script>
	import { Map, TileLayerWMS } from 'sveaflet';
	import { Label, Toggle } from 'flowbite-svelte';

	let enableOpacity = true;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Enable Opacity:</Label>
	<Toggle bind:checked={enableOpacity} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayerWMS
			baseUrl="http://ows.mundialis.de/services/service?"
			options={{
				layers: 'TOPO-OSM-WMS',
				opacity: enableOpacity ? 0.5 : 1
			}}
		/>
	</Map>
</div>
```

## Props

| Prop name | Description                         | Type                                                                    | Default |
| --------- | ----------------------------------- | ----------------------------------------------------------------------- | ------- |
| baseUrl   | **Required**                        | string                                                                  |         |
| options   | **Optional**                        | [WMSOptions](https://leafletjs.com/reference.html#tilelayer-wms-option) | `{}`    |
| name        | **Optional**. Layer name in ControlLayers             | string                                                                    |         |
| checked     | **Optional**. Default selected layer in ControlLayers | boolean                                                                   |         |
| layerType   | **Optional**. Layer type in ControlLayers             | 'base' \| 'overlay' \| undefined                                          |         |                                                             |         |
