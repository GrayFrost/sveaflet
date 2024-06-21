---
layout: componentLayout
breadcrumb_title: Marker
title: Marker - Sveaflet
component_title: Marker
dir: Components
description: UI Layers - Marker
---

Marker Component is used to display clickable/draggable icons on the map. Extends [Layer](https://leafletjs.com/reference.html#layer).

## Setup

```svelte example csr hideOutput
<script>
	import { Marker } from 'sveaflet';
</script>
```

## Default Marker

```svelte example csr
<script>
	import { Map, TileLayer, Marker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latLng={[51.505, -0.09]} />
	</Map>
</div>
```

## Marker with Options

```svelte example csr
<script>
	import { Map, TileLayer, Marker } from 'sveaflet';
	import { Label, Toggle } from 'flowbite-svelte';

	let enableOpacity = true;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Enable Opacity:</Label>
	<Toggle bind:checked={enableOpacity} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latLng={[51.505, -0.09]} options={{ opacity: enableOpacity ? 0.5 : 1 }} />
	</Map>
</div>
```

## Marker with Popup

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latLng={[51.505, -0.09]}>
			<Popup options={{ content: 'Popup in Marker.' }} />
		</Marker>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                | Default                        |
| --------- | ------------ | ------------------------------------------------------------------- | ------------------------------ |
| latLng    | **Required** | [LatLng](https://leafletjs.com/reference.html#latLng)               |                                |
| options   | **Optional** | [MarkerOptions](https://leafletjs.com/reference.html#marker-option) | `{ icon: new Icon.Default() }` |
