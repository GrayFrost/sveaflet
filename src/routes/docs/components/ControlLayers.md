---
breadcrumb_title: Layers
title: Controls.Layer
component_title: ControlLayers
dir: Components
description: Controls.Layers
---

```svelte example csr
<script>
	import { Map, ControlLayers, TileLayer, LayerGroup, Marker, Popup } from 'sveaflet';
</script>

<div style="width:500px;height:500px">
	<Map
		options={{
			center: [39.73, -104.99],
			zoom: 10,
			attributionControl: false
		}}
	>
		<ControlLayers options={{collapsed: false}}>
			<TileLayer
				urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution: '© OpenStreetMap'
				}}
				checked={true}
			/>
			<TileLayer
				urlTemplate={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution:
						'© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
				}}
			/>

			<LayerGroup checked={true}>
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
			<LayerGroup>
				<Marker latlng={[39.75, -105.09]}>
					<Popup options={{ content: 'This is Crown Hill Park.' }} />
				</Marker>
				<Marker latlng={[39.68, -105.00]}>
					<Popup options={{ content: 'This is Ruby Hill Park.' }} />
				</Marker>
			</LayerGroup>
		</ControlLayers>
	</Map>
</div>
```
