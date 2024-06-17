---
layout: componentLayout
breadcrumb_title: Rectangle
title: Rectangle
component_title: Rectangle
dir: Components
description: Rectangle
---

# Rectangle

```svelte example csr
<script>
	import { Map, TileLayer, Rectangle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [55, -4.5], zoom: 6 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Rectangle
			latLngBounds={[
				[54.559322, -5.767822],
				[56.1210604, -3.02124]
			]}
			options={{ color: '#ff7800' }}
		/>
	</Map>
</div>
```

// todo doc
