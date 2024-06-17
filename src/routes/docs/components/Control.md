---
layout: componentLayout
breadcrumb_title: Control
title: Control - Sveaflet
component_title: Control
dir: Components
description: Vectors Layers - Control
---

## Demo

```svelte example csr
<script>
	import { Map, TileLayer, Control } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13,
			zoomControl: false,
			attributionControl: false
		}}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Control options={{ position: 'topright' }}>
			<div style="border:2px solid black;background:white;padding:8px;">Control content</div>
		</Control>
	</Map>
</div>
```
