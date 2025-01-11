---
layout: componentLayout
breadcrumb_title: Attribution
title: ControlAttribution - Sveaflet
component_title: ControlAttribution
dir: components
description: Controls - Attribution
---

The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its [attributionControl option](https://leafletjs.com/reference.html#map-attributioncontrol) to false, and it fetches attribution texts from layers with the [getAttribution method](https://leafletjs.com/reference.html#layer-getattribution) automatically. Extends [Control](https://leafletjs.com/reference.html#control).

## Setup

```svelte example csr hideOutput
<script>
	import { ControlAttribution } from 'sveaflet';
</script>
```

## Default ControlAttribution

```svelte example csr
<script>
	import { Map, TileLayer, ControlAttribution } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlAttribution />
	</Map>
</div>
```

## ControlAttribution with Options

```svelte example csr
<script>
	import { onMount } from 'svelte';
	import { Map, TileLayer, ControlAttribution } from 'sveaflet';
	import { Radio } from 'flowbite-svelte';

	let prefix = $state('Sveaflet');
</script>

<div class="flex items-center gap-4 mb-4">
	<Radio bind:group={prefix} value="Sveaflet">Sveaflet</Radio>
	<Radio bind:group={prefix} value="Svelte">Svelte</Radio>
	<Radio bind:group={prefix} value="Leaflet">Leaflet</Radio>
</div>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlAttribution
			options={{
				prefix
			}}
		/>
	</Map>
</div>
```

## Hide default Attribution

```svelte example csr
<script>
	import { Map, TileLayer, ControlAttribution } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map
		options={{
			center: [51.505, -0.09],
			zoom: 13,
			attributionControl: false
		}}
	>
		<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<ControlAttribution
			options={{
				prefix: 'sveaflet'
			}}
		/>
	</Map>
</div>
```

## Props

| Prop name | Description  | Type                                                                                          | Default |
| --------- | ------------ | --------------------------------------------------------------------------------------------- | ------- |
| options   | **Optional** | [Control.AttributionOptions](https://leafletjs.com/reference.html#control-attribution-option) | `{}`    |
