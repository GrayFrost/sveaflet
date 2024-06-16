---
layout: componentLayout
breadcrumb_title: LayerGroup
title: LayerGroup - Sveaflet
component_title: LayerGroup
dir: Components
description: Other Layers - LayerGroup
---

Used to group several layers and handle them as one. If you add it to the map, any layers added or removed from the group will be added/removed on the map as well. Extends [Layer](https://leafletjs.com/reference.html#layer).

## Setup

```svelte example csr hideOutput
<script>
	import { LayerGroup } from 'sveaflet';
</script>
```

## Default LayerGroup

```svelte example csr
<script>
	import { Map, LayerGroup, Marker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.7, -104.9], zoom: 9 }}>
		<LayerGroup>
			<Marker latlng={[39.61, -105.02]} />
			<Marker latlng={[39.74, -104.99]} />
			<Marker latlng={[39.73, -104.8]} />
			<Marker latlng={[39.77, -105.23]} />
		</LayerGroup>
	</Map>
</div>
```

## LayerGroup with Options

```svelte example csr
<script>
	import { Map, LayerGroup, Marker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.7, -104.9], zoom: 9 }}>
		<LayerGroup options={{ attribution: 'LayerGroup' }}>
			<Marker latlng={[39.61, -105.02]} />
			<Marker latlng={[39.74, -104.99]} />
			<Marker latlng={[39.73, -104.8]} />
			<Marker latlng={[39.77, -105.23]} />
		</LayerGroup>
	</Map>
</div>
```

## Props

| Prop name   | Description                                              | Type   | Default |
| ----------- | -------------------------------------------------------- | ------ | ------- |
| overlayName | **Optional**. Overlay name in ControlLayers.             | String |         |
| checked     | **Optional**. Default selected Overlay in ControlLayers. | String |         |
| options     | **Optional**                                             | Object | `{}`    |
