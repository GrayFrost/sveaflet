---
layout: componentLayout
breadcrumb_title: TileLayer
title: TileLayer - Sveaflet
component_title: TileLayer
dir: Components
description: TileLayer
---

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

## Props

// todo doc