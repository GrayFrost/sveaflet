---
layout: componentLayout
breadcrumb_title: markers-with-custom-icons
title: Markers With Custom Icons
component_title: Markers With Custom Icons
dir: examples
description: In this tutorial, you’ll learn how to easily define your own icons for use by the markers you put on the map.
---

## Example

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Icon, Popup } from 'sveaflet';

	const commonIconOptions = {
		shadowUrl: '/images/leaf-shadow.png',

		iconSize: [38, 95], // size of the icon
		shadowSize: [50, 64], // size of the shadow
		iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
		shadowAnchor: [4, 62], // the same for the shadow
		popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
	};

	const greenIconOptions = {
		...commonIconOptions,
		iconUrl: '/images/leaf-green.png'
	};

	const redIconOptions = {
		...commonIconOptions,
		iconUrl: '/images/leaf-red.png'
	};

	const orangeIconOptions = {
		...commonIconOptions,
		iconUrl: '/images/leaf-orange.png'
	};
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<Icon options={greenIconOptions} />
			<Popup options={{ content: 'I am a green leaf.' }} />
		</Marker>
		<Marker latlng={[51.495, -0.083]}>
			<Icon options={redIconOptions} />
			<Popup options={{ content: 'I am a red leaf.' }} />
		</Marker>
		<Marker latlng={[51.49, -0.1]}>
			<Icon options={orangeIconOptions} />
			<Popup options={{ content: 'I am a orange leaf.' }} />
		</Marker>
	</Map>
</div>
```
