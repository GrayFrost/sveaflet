---
breadcrumb_title: Circle
title: Circle
component_title: Circle
dir: Components
description: Circle
---

# circle

```svelte example csr
<script>
	import { Map, Circle } from 'sveaflet';
</script>

<div style="width: 500px;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		/>
	</Map>
</div>
```
