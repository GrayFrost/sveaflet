---
layout: componentLayout
breadcrumb_title: wms
title: WMS
component_title: WMS
dir: examples
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
        url={'http://ows.mundialis.de/services/service?'}
				name="Topography"
				options={{
					layers: 'TOPO-WMS'
				}}
				layerType="base"
			/>
			<TileLayerWMS
        url={'http://ows.mundialis.de/services/service?'}
				name="Places"
				options={{
					layers: 'OSM-Overlay-WMS'
				}}
				layerType="base"
			/>
			<TileLayerWMS
        url={'http://ows.mundialis.de/services/service?'}
				name="Topography, then places"
				options={{
					layers: 'TOPO-WMS,OSM-Overlay-WMS'
				}}
				layerType="base"
			/>
			<TileLayerWMS
        url={'http://ows.mundialis.de/services/service?'}
				name="Places, then topography"
				options={{
					layers: 'OSM-Overlay-WMS,TOPO-WMS'
				}}
				layerType="base"
			/>
		</ControlLayers>
	</Map>
</div>
```
