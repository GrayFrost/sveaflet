---
layout: componentLayout
breadcrumb_title: Polyline
title: Polyline
component_title: Polyline
dir: Components
description: Polyline
---

# Polyline

```svelte example csr
<script>
	import { Map, Polyline } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [37.77, -122.43], zoom: 4 }}>
		<Polyline
			latlngs={[
				[45.51, -122.68],
				[37.77, -122.43],
				[34.04, -118.2]
			]}
			options={{ color: 'yellow' }}
		/>
	</Map>
</div>
```
