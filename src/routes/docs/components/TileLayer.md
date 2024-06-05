---
breadcrumb_title: TileLayer
title: TileLayer
component_title: TileLayer
dir: Components
description: TileLayer
---

# tilelayer

```svelte example
<script>
	import { Map, TileLayer } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
	</Map>
</div>
```
