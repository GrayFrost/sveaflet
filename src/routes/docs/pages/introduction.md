---
layout: componentLayout
breadcrumb_title: introduction
title: Sveaflet
component_title: Introduction
dir: pages
description: Sveaflet provides Svelte components for Leaflet mapping components to allow simple construction of declarative maps.
---

## Setup

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

Here within the Svelte file we create an `<Map>` component, and wrap the `<Map>` component with a certain `height` html element, just like `<div>`. Then initial the map with `options` property, the `options` props is same as Leaflet Class's options. Nested inside the map we add an `<TileLayer>` component to provide the OpenStreetMap (opens new window)base layer and its attribution (opens new window), along with an `<Marker>` component placed at a bound latitude and longitude.

## Leaflet elements references

Each Sveaflet component has its own `instance` property, through this property, you can call leaflet object's api to operate relevant objects.

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Popup, Circle } from 'sveaflet';
	import { Button } from 'flowbite-svelte';

	let marker;
	let circle;

	function markerOpenPopup() {
		marker && marker.openPopup();
	}

	function circleOpenPopup() {
		circle && circle.openPopup();
	}
</script>

<div class="flex items-center mb-4 gap-4">
	<Button on:click={markerOpenPopup}>Marker openPopup</Button>
	<Button on:click={circleOpenPopup}>Circle openPopup</Button>
</div>
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
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
			bind:instance={circle}
		>
			<Popup options={{ content: 'Hello Sveaflet. (Circle)' }} />
		</Circle>
	</Map>
</div>
```

In this example, we open layer's popup through `marker` and `circle` instance, each component in Sveaflet has its own instance. If you encouter a problem that you can't solve only by suing Sveaflet components, just use `instance`. `instance` is same as object which is Instantiated by Leaflet component class.

## Limitations

When you want to update a component through props, it will update when the props value can be `set` by leaflet object.
For example:

## Popup with slot content

```svelte example csr
<script>
	import { Map, TileLayer, Popup } from 'sveaflet';
	import { Radio, Label, Input } from 'flowbite-svelte';

	let content = 'Popup content.';
	let minWidth = 100;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Content:</Label>
	<Input type="text" bind:value={content} maxlength={20} />
</div>
<div class="flex items-center gap-4 mb-4">
	<Label>Min Width:</Label>
	<Input type="number" bind:value={minWidth} min={100} max={200} step={10} />
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Popup
			latlng={[51.5, -0.09]}
			options={{
				content,
				minWidth
			}}
		/>
	</Map>
</div>
```
You can update `options.content` but not `options.minWidth`, because popup object has `setContent()` function but doesn't have `setMinWidth()` function. Details [here](https://leafletjs.com/reference.html#divoverlay).
