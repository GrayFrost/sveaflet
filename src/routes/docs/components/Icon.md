---
breadcrumb_title: Icon
title: Icon
component_title: Icon
dir: Components
description: Icon
---

# Icon

```svelte example
<script>
	import { Map, Marker, Icon } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Marker latlng={[51.5, -0.09]}>
			<Icon
				options={{
					iconUrl: '/images/leaf-green.png',
					shadowUrl: '/images/leaf-shadow.png',
					iconSize: [38, 95],
					shadowSize: [50, 64],
					iconAnchor: [22, 94],
					shadowAnchor: [4, 62]
				}}
			/>
		</Marker>
	</Map>
</div>
```
