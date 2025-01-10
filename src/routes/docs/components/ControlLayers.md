---
layout: componentLayout
breadcrumb_title: Layers
title: ControlLayers - Sveaflet
component_title: ControlLayers
dir: components
description: Controls - Layers
---

The layers control gives users the ability to switch between different base layers and switch overlays on/off. Extends [Control](https://leafletjs.com/reference.html#control).

## Setup

```svelte exampel csr hideOutput
<script>
	import { ControlLayers } from 'sveaflet';
</script>
```

## Default ControlLayers

```svelte example csr
<script>
	import { Map, TileLayer, ControlLayers } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [39.73, -104.99],
			zoom: 10
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlLayers />
	</Map>
</div>
```

## ControlLayers with slot content

If your ControlLayers includes any slot layer content, remove default TileLayer Component.

Any TileLayers would be added to base layer, and LayerGroup would be added to overlay layer.

```svelte example csr
<script>
	import { Map, ControlLayers, TileLayer, LayerGroup, Marker, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [39.73, -104.99],
			zoom: 10
		}}
	>
		<ControlLayers>
			<TileLayer
				name="OpenStreetMap"
				url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution: '© OpenStreetMap'
				}}
				checked={true}
				layerType="base"
			/>
			<TileLayer
				name="OpenStreetMap.HOT"
				url={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution:
						'© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
				}}
				layerType="base"
			/>
			<TileLayer
				name="OpenTopoMap"
				url={'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution:
						'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
				}}
				layerType="base"
			/>

			<LayerGroup checked={true} name="Cities" layerType="overlay">
				<Marker latLng={[39.61, -105.02]}>
					<Popup options={{ content: 'This is Littleton, CO.' }} />
				</Marker>
				<Marker latLng={[39.74, -104.99]}>
					<Popup options={{ content: 'This is Denver, CO.' }} />
				</Marker>
				<Marker latLng={[39.73, -104.8]}>
					<Popup options={{ content: 'This is Aurora, CO.' }} />
				</Marker>
				<Marker latLng={[39.77, -105.23]}>
					<Popup options={{ content: 'This is Golden, CO.' }} />
				</Marker>
			</LayerGroup>
			<LayerGroup name="Parks" layerType="overlay">
				<Marker latLng={[39.75, -105.09]}>
					<Popup options={{ content: 'This is Crown Hill Park.' }} />
				</Marker>
				<Marker latLng={[39.68, -105.0]}>
					<Popup options={{ content: 'This is Ruby Hill Park.' }} />
				</Marker>
			</LayerGroup>
		</ControlLayers>
	</Map>
</div>
```

## ControlLayers with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, ControlLayers, TileLayer, LayerGroup, Marker, Popup } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let position = $state('topright');
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={position} value="topright">Top Right</Radio>
	<Radio bind:group={position} value="bottomright">Bottom Right</Radio>
	<Radio bind:group={position} value="bottomleft">Bottom Left</Radio>
	<Radio bind:group={position} value="topleft">Top Left</Radio>
</div>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [39.73, -104.99],
			zoom: 10
		}}
	>
		<ControlLayers options={{ position, collapsed: false }}>
			<TileLayer
				name="OpenStreetMap"
				url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution: '© OpenStreetMap'
				}}
				checked={true}
				layerType="base"
			/>
			<TileLayer
				name="OpenStreetMap.HOT"
				url={'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'}
				options={{
					maxZoom: 19,
					attribution:
						'© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
				}}
				layerType="base"
			/>
		</ControlLayers>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                                | Default |
| --------- | ------------ | ----------------------------------------------------------------------------------- | ------- |
| options   | **Optional** | [Control.LayersOptions](https://leafletjs.com/reference.html#control-layers-option) | `{}`    |
