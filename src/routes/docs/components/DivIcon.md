---
layout: componentLayout
breadcrumb_title: DivIcon
title: DivIcon - Sveaflet
component_title: DivIcon
dir: Components
description: Basic Types - DivIcon
---

Represents a lightweight icon for markers that uses a simple `<div>` element instead of an image. Inherits from [Icon](https://leafletjs.com/reference.html#icon) but ignores the iconUrl and shadow options.

## Setup

```svelte example csr hideOutput
<script>
	import { DivIcon } from 'sveaflet';
</script>
```

## Default DivIcon

```svelte example csr
<script>
	import { Map, TileLayer, Marker, DivIcon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<DivIcon />
		</Marker>
	</Map>
</div>
```

## DivIcon with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, Marker, DivIcon } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let classNames = {
		red: 'red-icon',
		blue: 'blue-icon'
	};
	let color = 'red';

	$: className = classNames[color];
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={color} value="red">Red</Radio>
	<Radio bind:group={color} value="blue">Blue</Radio>
</div>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<DivIcon
				options={{
					className
				}}
			></DivIcon>
		</Marker>
	</Map>
</div>

<style>
	:global(.red-icon) {
		width: 50px !important;
		height: 50px !important;
		background: red;
	}
	:global(.blue-icon) {
		width: 50px !important;
		height: 50px !important;
		background: blue;
	}
</style>
```

## DivIcon with slot content

```svelte example csr
<script>
	import { Map, TileLayer, Marker, DivIcon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<DivIcon>
				<div style="font-size:20px;font-weight:bold;color: red;">DivIcon</div>
			</DivIcon>
		</Marker>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                  | Default |
| --------- | ------------ | --------------------------------------------------------------------- | ------- |
| options   | **Optional** | [DivIconOptions](https://leafletjs.com/reference.html#divicon-option) | `{}`    |
