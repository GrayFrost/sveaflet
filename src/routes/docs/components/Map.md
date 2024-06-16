---
layout: componentLayout
breadcrumb_title: Map
title: Map - Sveaflet
component_title: Map
dir: Components
description: Sveaflet Map Container
---

Root Component that wraps other all components.

## Setup

```svelte example csr hideOutput
<script>
	import { Map } from 'sveaflet';
</script>
```

## Default Map

In Sveaflet, Map component contains a default TileLayer Component, so you don't need to import TileLayer everytime if you just use [OpenStreetMap](https://www.openstreetmap.org/)'s Tiles.

```svelte example csr
<script>
	import { Map } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }} />
</div>
```

## Map with id selector

```svelte example csr
<script>
	import { Map } from 'sveaflet';
</script>

<div style="width: 100%;height:500px" id="my-map"></div>

<Map id="my-map" options={{ center: [51.505, -0.09], zoom: 13 }} />
```

## Props

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| id | **Optional**. DOM ID of a `<div>` element. | String |  |
| options | **Required**. At least provide center and zoom value. | [MapOptions](https://leafletjs.com/reference.html#map-option) | `{}` |