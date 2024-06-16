---
layout: componentLayout
breadcrumb_title: Scale
title: ControlScale - Sveaflet
component_title: ControlScale
dir: Components
description: Controls - Scale
---

A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends [Control](https://leafletjs.com/reference.html#control).

## Setup

```svelte example csr hideOutput
<script>
	import { ControlScale } from 'sveaflet';
</script>
```

## Default ControlScale

```svelte example csr
<script>
	import { Map, ControlScale } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<ControlScale />
	</Map>
</div>
```

## ControlScale with options

```svelte example csr
<script>
	import { Map, ControlScale } from 'sveaflet';
</script>

<div style="width: 100%;height:500px">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<ControlScale options={{ maxWidth: 200 }}/>
	</Map>
</div>
```

## Props

| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| options   | **Optional** | [Control.ScaleOptions](https://leafletjs.com/reference.html#control-scale-option) | `{}` |