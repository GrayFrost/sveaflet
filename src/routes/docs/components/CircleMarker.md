---
breadcrumb_title: CircleMarker
title: CircleMarker
component_title: CircleMarker
dir: Components
description: CircleMarker
---

# circleMarker

```svelte example
<script>
	import { Map, CircleMarker } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<CircleMarker latlng={[51.508, -0.11]} options={{ radius: 20 }} />
	</Map>
</div>
```
