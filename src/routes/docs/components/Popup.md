---
layout: componentLayout
breadcrumb_title: Popup
title: Popup - Sveaflet
component_title: Popup
dir: components
description: UI Layers - Popup
---

Used to open popups in certain places of the map.

## Setup

```svelte example csr hideOutput
<script>
	import { Popup } from 'sveaflet';
</script>
```

## Default Popup

```svelte example csr
<script>
	import { Map, TileLayer, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Popup
			latLng={[51.5, -0.09]}
			options={{
				content: 'Popup Content.'
			}}
		/>
	</Map>
</div>
```

## Popup with slot content

```svelte example csr
<script>
	import { Map, TileLayer, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Popup latLng={[51.5, -0.09]}>
			<div style="color:red;">Popup Content.</div>
		</Popup>
	</Map>
</div>
```

## Popup with Options

```svelte example csr
<script>
	import { Map, TileLayer, Popup } from 'sveaflet';
	import { Radio, Label, Input } from 'flowbite-svelte';

	let content = 'Popup content.';
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Content:</Label>
	<Input type="text" bind:value={content} maxlength={20} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Popup
			latLng={[51.5, -0.09]}
			options={{
				content
			}}
		/>
	</Map>
</div>
```

## Popup in Layers

```svelte example csr
<script>
	import {
		Map,
		TileLayer,
		Popup,
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
			<Popup options={{ content: 'Popup in Marker.' }} />
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
			<Popup options={{ content: 'Popup in Circle.' }} />
		</Circle>
		<CircleMarker latLng={[51.51, -0.13]} options={{ radius: 30, color: 'orange' }}>
			<Popup options={{ content: 'Popup in CircleMarker.' }} />
		</CircleMarker>
		<Polygon
			latLngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
		>
			<Popup options={{ content: 'Popup in Polygon.' }} />
		</Polygon>
		<Polyline
			latLngs={[
				[51.512, -0.09],
				[51.515, -0.1],
				[51.52, -0.11]
			]}
			options={{ color: 'purple' }}><Popup options={{ content: 'Popup in Polyline.' }} /></Polyline
		>
		<Rectangle
			latLngBounds={[
				[51.49, -0.08],
				[51.5, -0.06]
			]}
			options={{ color: 'green' }}><Popup options={{ content: 'Popup in Rectangle.' }} /></Rectangle
		>
	</Map>
</div>
```

## Props

| Prop name | Description                                                                           | Type                                                              | Default |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| latLng    | **Required** when used directly in Map. **Optional** when used in any Layer Component | [LatLng](https://leafletjs.com/reference.html#latlng)             |         |
| options   | **Optional**                                                                          | [PopupOptions](https://leafletjs.com/reference.html#popup-option) | `{}`    |
