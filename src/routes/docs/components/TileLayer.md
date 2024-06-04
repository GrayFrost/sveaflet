---
breadcrumb_title: Sveaflet
title: Sveaflet
component_title: tilelayer
dir: Components
description: TODO TODO
---

# tilelayer

```svelte example
<script>
  import { Map, TileLayer } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
<Map>
  <TileLayer
		urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
		options={{
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}}
	/>
</Map>
</div>
```