---
layout: componentLayout
breadcrumb_title: Polygon
title: Polygon
component_title: Polygon
dir: Components
description: Polygon
---

# Polygon

```svelte example csr
<script>
	import { Map, Polygon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.503, -0.06], zoom: 13 }}>
		<Polygon
			latlngs={[
				[51.509, -0.08],
				[51.503, -0.06],
				[51.51, -0.047]
			]}
		/>
	</Map>
</div>
```
