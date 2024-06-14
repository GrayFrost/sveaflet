---
breadcrumb_title: Layer Groups and Layers Control
title: Layer Groups and Layers Control
component_title: Layer Groups and Layers Control
dir: Examples
description: Layer Groups and Layers Control
---

# Layer Groups and Layers Control

```svelte example csr
<script>
	import { Map, LayerGroup, Marker, Popup } from 'sveaflet';
</script>

<div style="width:700px;height:500px">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 10
		}}
	>
		<LayerGroup>
			<Marker latlng={[39.61, -105.02]}>
				<Popup options={{ content: 'This is Littleton, CO.' }} />
			</Marker>
			<Marker latlng={[39.74, -104.99]}>
				<Popup options={{ content: 'This is Denver, CO.' }} />
			</Marker>
			<Marker latlng={[39.73, -104.8]}>
				<Popup options={{ content: 'This is Aurora, CO.' }} />
			</Marker>
			<Marker latlng={[39.77, -105.23]}>
				<Popup options={{ content: 'This is Golden, CO.' }} />
			</Marker>
		</LayerGroup>
	</Map>
</div>
```
