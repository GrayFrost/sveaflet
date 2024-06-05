---
breadcrumb_title: ImageOverlay
title: ImageOverlay
component_title: ImageOverlay
dir: Components
description: ImageOverlay
---

# ImageOverlay

```svelte example
<script>
	import { Map, TileLayer, ImageOverlay } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [37.8, -96], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ImageOverlay
			imageUrl="https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
			bounds={[
				[40.799311, -74.118464],
				[40.68202047785919, -74.33]
			]}
		/>
	</Map>
</div>
```
