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
	import { Map, ImageOverlay } from 'sveaflet';
</script>

<div style="width: 500px; height: 500px; ">
	<Map options={{ center: [40.799311, -74.33], zoom: 10 }}>
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
