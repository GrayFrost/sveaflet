---
layout: componentLayout
breadcrumb_title: Icon
title: Icon - Sveaflet
component_title: Icon
dir: components
description: Basic Types - Icon
---

Represents an icon to provide when creating a marker.

## Setup

```svelte example csr hideOutput
<script>
	import { Icon } from 'sveaflet';
</script>
```

## Default Icon

**iconUrl** is required in options.

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Icon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<Icon
				options={{
					iconUrl: '/images/leaf-green.png'
				}}
			/>
		</Marker>
	</Map>
</div>
```

## Icon with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, Marker, Icon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<Icon
				options={{
					iconUrl: '/images/leaf-green.png',
					shadowUrl: '/images/leaf-shadow.png',
					iconSize: [38, 95],
					shadowSize: [50, 64],
					iconAnchor: [22, 94],
					shadowAnchor: [4, 62]
				}}
			/>
		</Marker>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                            | Default           |
| --------- | ------------ | --------------------------------------------------------------- | ----------------- |
| options   | **Required** | [IconOptions](https://leafletjs.com/reference.html#icon-option) | `{ iconUrl: '' }` |
