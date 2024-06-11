---
breadcrumb_title: Layers
title: Controls.Layer
component_title: ControlLayers
dir: Components
description: Controls.Layers
---

```svelte example csr
<script>
	import { Map, ControlLayers, TileLayer } from 'sveaflet';
</script>

<div style="width:500px;height:500px">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13,
			attributionControl: false
		}}
	>
		<ControlLayers
		/>
	</Map>
</div>
```
