---
layout: componentLayout
breadcrumb_title: quick-start
title: Quick Start
component_title: Quick Start
dir: pages
description: A quick start to learn how to use Sveaflet
---

This documentation assumes you are already familiar with Svelte and have a project setup. If it is not the case, you should read Svelte's [Getting Started documentation](https://learn.svelte.dev/tutorial/welcome-to-svelte) first.

## Installation

```bash
npm install sveaflet --save
```

## Usage

Sveaflet provides 20+ components for you to build you map page fastly, more details [here](https://sveaflet.vercel.app/docs/components/Circle).

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
</script>

<div style="width:100%;height:500px;">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13
		}}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.505, -0.09]} />
	</Map>
</div>
```

Sveaflet also supports Typescript.

```svelte example csr hideOutput
<script lang="ts">
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';
	import type { Marker } from 'leaflet';

	let marker: Marker;

	if (marker) {
		marker.openPopup();
	}
</script>

<div style="width:100%;height:500px;">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13
		}}
	>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.505, -0.09]} bind:instance={marker}>
			<Popup
				options={{
					content: 'Hello Sveaflet.'
				}}
			></Popup>
		</Marker>
	</Map>
</div>
```

## Events

In current version, Sveaflet does not customize a new event type, you can just add an event listener to Leaflet objects to complete your works. If you want to get Leaflet object, use [`bind:instane`](https://sveaflet.vercel.app/docs/pages/introduction#Leaflet_elements_references)

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Popup } from 'sveaflet';

	let map;
	let popup;
	$: popupLatLng = [51.513, -0.09];
	$: popupContent = 'I am a standalone popup.';

	$: if (map) {
		map.on('click', onMapClick);
	}

	function onMapClick(e) {
		popupLatLng = e.latlng;
		popupContent = 'You clicked the map at ' + e.latlng.toString();
		if (popup) {
			popup.openOn(map);
		}
	}
</script>

<div style="width: 100%;height:500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }} bind:instance={map}>
		<TileLayer
			urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}}
		/>
		<Popup latlng={popupLatLng} options={{ content: popupContent }} />
	</Map>
</div>
```
In this example, we use `map.on('click', () => {})` to listen map's click function.
