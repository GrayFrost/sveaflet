---
layout: componentLayout
breadcrumb_title: non-geographical-maps
title: Non-geographical maps
component_title: Non-geographical maps
dir: examples
description: Sometimes, maps do not represent things on the surface of the earth and, as such, do not have a concept of geographical latitude and geographical longitude. Most times this refers to big scanned images, such as game maps.
---

## Example

```svelte example csr
<script>
	import { Map, ImageOverlay, Marker, Polyline, Popup } from 'sveaflet';
	import L from 'leaflet';
	import imageUrl from '../assets/uqm_map_full.png';

	const bounds = [
		[-26.5, -25],
		[1021.5, 1023]
	];

	const sol = [145.0, 175.2];

	const mizar = [130.1, 41.6];
	const kruegerZ = [56.5, 13.4];
	const deneb = [8.3, 218.7];
</script>

<div style="width: 600px; height: 400px; ">
	<Map options={{ crs: L.CRS.Simple, minZoom: -3, center: [70, 120], zoom: 1 }}>
		<ImageOverlay url={imageUrl} {bounds} />
		<Marker latLng={sol}><Popup options={{ content: 'Sol' }} /></Marker>
		<Marker latLng={mizar}><Popup options={{ content: 'Mizar' }} /></Marker>
		<Marker latLng={kruegerZ}><Popup options={{ content: 'Krueger-Z' }} /></Marker>
		<Marker latLng={deneb}><Popup options={{ content: 'Deneb' }} /></Marker>
		<Polyline latLngs={[sol, deneb]} />
	</Map>
</div>
```
