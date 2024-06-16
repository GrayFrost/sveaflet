---
layout: componentLayout
breadcrumb_title: Marker
title: Marker - Sveaflet
component_title: Marker
dir: Components
description: UI Layers - Marker
---

Marker Component is used to display clickable/draggable icons on the map. Extends [Layer](https://leafletjs.com/reference.html#layer).

## Setup

```svelte example csr hideOutput
<script>
	import { Map, Marker } from 'sveaflet';
</script>
```

## Default Marker

```svelte example csr
<script>
	import { Map, Marker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Marker latlng={[51.505, -0.09]} />
	</Map>
</div>
```

## Marker with Options

```svelte example csr
<script>
	import { Map, Marker } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Marker latlng={[51.505, -0.09]} options={{ title: 'Marker Title', draggable: true }} />
	</Map>
</div>
```

## Marker with Popup

```svelte example csr
<script>
	import { Map, Marker, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Marker latlng={[51.505, -0.09]}>
			<Popup options={{ content: 'Popup in Marker.' }} />
		</Marker>
	</Map>
</div>
```

## Props

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| latlng | **Required** | [LatLng](https://leafletjs.com/reference.html#latlng) | |
| options | **Optional** | [MarkerOptions](https://leafletjs.com/reference.html#marker-option) | `{ icon: new Icon.Default() }` |