---
breadcrumb_title: LayerGroup
title: LayerGroup
component_title: LayerGroup
dir: Components
description: LayerGroup
---

# LayerGroup

```svelte example
<script>
	import { Map, Marker, LayerGroup } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [39.7, -104.9], zoom: 9 }}>
		<LayerGroup>
      <Marker latlng={[39.61, -105.02]} />
      <Marker latlng={[39.74, -104.99]} />
      <Marker latlng={[39.73, -104.8]} />
      <Marker latlng={[39.77, -105.23]} />
    </LayerGroup>
	</Map>
</div>
```
