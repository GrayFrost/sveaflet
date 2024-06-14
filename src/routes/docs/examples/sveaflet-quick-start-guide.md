---
breadcrumb_title: Sveaflet Quick Start Guide
title: Sveaflet Quick Start Guide
component_title: Sveaflet Quick Start Guide
dir: Examples
description: todo
---

# Sveaflet Quick Start Guide

This step-by-step guide will quickly get you started on Sveaflet basics, including setting up a Sveaflet map, working with markers, polylines and popups, and dealing with events.


## Setting up the map

```svelte example hideScript csr
<script>
	import { Map } from 'sveaflet';
</script>

<div style="width:500px;height:500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}></Map>
</div>
```

```html
<script>
	import { Map } from 'sveaflet';
</script>

<div style="width:500px;height:500px;">
	<map options="{{center:[51.505," -0.09], zoom:13}}></map>
</div>
```

```svelte example csr
<script>
	import { Map, TileLayer } from 'sveaflet';
</script>

<div style="width:500px;height:500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer
			urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
			options={{
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}}
		/>
	</Map>
</div>
```
