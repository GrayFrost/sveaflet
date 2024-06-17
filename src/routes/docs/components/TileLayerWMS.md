---
layout: componentLayout
breadcrumb_title: TileLayerWMS
title: TileLayerWMS
component_title: TileLayerWMS
dir: Components
description: TileLayerWMS
---

# tilelayer

```svelte example csr
<script>
	import { Map, TileLayerWMS } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayerWMS
			baseUrl="http://ows.mundialis.de/services/service?"
			options={{
				layers: 'TOPO-OSM-WMS'
			}}
		/>
	</Map>
</div>
```

// todo doc