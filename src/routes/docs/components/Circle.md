---
layout: componentLayout
breadcrumb_title: Circle
title: Circle - Sveaflet
component_title: Circle
dir: components
description: Vectors Layers - Circle
---

A component for drawing circle overlays on a map. Extends [CircleMarker](https://leafletjs.com/reference.html#circlemarker).

It's an approximation and starts to diverge from a real circle closer to poles (due to projection distortion).

## Setup

```svelte example csr hideOutput
<script>
	import { Circle } from 'sveaflet';
</script>
```

## Default Circle

```svelte example csr
<script>
	import { Map, TileLayer, Circle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Circle latlng={[51.508, -0.11]} />
	</Map>
</div>
```

## Circle with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, Circle } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let color = 'red';
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={color} value="red">Red</Radio>
	<Radio bind:group={color} value="green">Green</Radio>
	<Radio bind:group={color} value="blue">Blue</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: color,
				fillColor: color,
				fillOpacity: 0.5,
				radius: 500
			}}
		/>
	</Map>
</div>
```

## Circle with Popup

```svelte example csr
<script>
	import { Map, TileLayer, Circle, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		>
			<Popup options={{ content: 'Popup in Circle.' }} />
		</Circle>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                | Default           |
| --------- | ------------ | ------------------------------------------------------------------- | ----------------- |
| latlng    | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng)               |                   |
| options   | **Optional** | [CircleOptions](https://leafletjs.com/reference.html#circle-option) | `{ radius: 100 }` |

