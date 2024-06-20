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
	import { Map, TileLayer, LayerGroup, Marker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.7, -104.9], zoom: 9 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
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
	import { Map, TileLayer, LayerGroup, Marker } from 'sveaflet';
	import { Label, Input } from 'flowbite-svelte';

	let attribution = 'LayerGroup';
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Attribution:</Label>
	<Input type="text" maxlength={20} bind:value={attribution} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [39.7, -104.9], zoom: 9 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<LayerGroup options={{ attribution }}>
			<Marker latlng={[39.61, -105.02]} />
			<Marker latlng={[39.74, -104.99]} />
			<Marker latlng={[39.73, -104.8]} />
			<Marker latlng={[39.77, -105.23]} />
		</LayerGroup>
	</Map>
</div>
```

## Layers in LayerGroup

```svelte example csr
<script>
	import {
		Map,
		TileLayer,
		LayerGroup,
		Marker,
		Circle,
		CircleMarker,
		Polygon,
		Polyline,
		Rectangle
	} from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<LayerGroup>
			<Marker latlng={[51.5, -0.09]} />
			<Circle
				latlng={[51.508, -0.11]}
				options={{
					color: 'red',
					fillColor: '#f03',
					fillOpacity: 0.5,
					radius: 500
				}}
			/>
			<CircleMarker latlng={[51.51, -0.13]} options={{ radius: 30, color: 'orange' }} />

			<Polygon
				latlngs={[
					[51.509, -0.08],
					[51.503, -0.06],
					[51.51, -0.047]
				]}
			/>
			<Polyline
				latlngs={[
					[51.512, -0.09],
					[51.515, -0.1],
					[51.52, -0.11]
				]}
				options={{ color: 'purple' }}
			/>
			<Rectangle
				latLngBounds={[
					[51.49, -0.08],
					[51.5, -0.06]
				]}
				options={{ color: 'green' }}
			/>
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
