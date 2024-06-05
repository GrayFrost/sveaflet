---
breadcrumb_title: Zoom
title: Controls.Zoom
component_title: ControlZoom
dir: Components
description: Controls.Zoom
---

```svelte example
<script>
	import { Map, TileLayer, ControlZoom } from 'sveaflet';
</script>

<div style="width:500px;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13, zoomControl: false }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlZoom />
	</Map>
</div>
```
