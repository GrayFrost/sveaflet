---
breadcrumb_title: Marker
title: Marker
component_title: Marker
dir: Components
description: Marker
---

# Marker

```svelte example csr
<script>
	import { Map, Marker } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Marker latlng={[51.505, -0.09]} />
	</Map>
</div>
```
