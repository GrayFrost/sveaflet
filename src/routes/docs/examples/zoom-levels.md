---
layout: componentLayout
breadcrumb_title: Zoom Levels
title: Zoom Levels
component_title: Zoom Levels
dir: Examples
description: Leaflet works with latitude, longitude and “zoom level”. Lower zoom levels means that the map shows entire continents, while higher zoom levels means that the map can show details of a city.
---

## Example

```svelte example csr
<script>
	import { onDestroy } from 'svelte';
	import { Map, TileLayer, ControlScale } from 'sveaflet';

	const cartodbAttribution =
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

	let map;
	let intervalId;
	let timeoutId;

	$: if (map) {
		intervalId = setInterval(() => {
			map.setView([0, 0], 0, { duration: 1, animate: true });
			timeoutId = setTimeout(() => {
				map.setView([60, 0], 0, { duration: 1, animate: true });
			}, 2000);
		}, 4000);
	}

	onDestroy(() => {
		intervalId && clearInterval(intervalId);
		timeoutId && clearTimeout(timeoutId);
		intervalId = undefined;
		timeoutId = undefined;
	});
</script>

<div style="width: 100%; height: 500px; ">
	<Map
		bind:instance={map}
		options={{
			center: [0, 0],
			zoom: 0,
			minZoom: 1,
			maxZoom: 1,
			dragging: false
		}}
	>
		<TileLayer
			urlTemplate={'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'}
			options={{
				attribution: cartodbAttribution
			}}
		/>
		<ControlScale options={{ maxWidth: 150 }} />
	</Map>
</div>
```
