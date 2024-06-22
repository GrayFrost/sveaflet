---
layout: componentLayout
breadcrumb_title: WMS
title: WMS
component_title: WMS
dir: Examples
description: WMS, short for web map service, is a popular way of publishing maps by professional GIS software (and seldomly used by non-GISers). This format is similar to map tiles, but more generic and not so well optimized for use in web maps. A WMS image is defined by the coordinates of its corners - a calculation that Leaflet does under the hood.
---

## Example

```svelte example csr
<script>
	import { Map, TileLayerWMS, ControlLayers } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [-17, -67], zoom: 3 }}>
		<ControlLayers options={{ collapsed: false }}>
			<TileLayerWMS
				checked={true}
				baseUrl={'http://ows.mundialis.de/services/service?'}
				layerName="Topography"
				options={{
					layers: 'TOPO-WMS'
				}}
			/>
			<TileLayerWMS
				baseUrl={'http://ows.mundialis.de/services/service?'}
				layerName="Places"
				options={{
					layers: 'OSM-Overlay-WMS'
				}}
			/>
			<TileLayerWMS
				baseUrl={'http://ows.mundialis.de/services/service?'}
				layerName="Topography, then places"
				options={{
					layers: 'TOPO-WMS,OSM-Overlay-WMS'
				}}
			/>
			<TileLayerWMS
				baseUrl={'http://ows.mundialis.de/services/service?'}
				layerName="Places, then topography"
				options={{
					layers: 'OSM-Overlay-WMS,TOPO-WMS'
				}}
			/>
		</ControlLayers>
	</Map>
</div>
```
