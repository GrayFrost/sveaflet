---
layout: componentLayout
breadcrumb_title: Custom Control
title: Custom Control
component_title: Custom Control
dir: Examples
description: A custom control displaying a miniature map
---

## Example

```svelte example csr
<script>
	import { Map, Rectangle, TileLayer, Control } from 'sveaflet';
	let parentMap;
	let miniMap;
	let bounds;

	$: mapCenter = parentMap?.getCenter() || [];

	$: miniMap?.on('click', onClickMiniMap);

	function onClickMiniMap(e) {
		parentMap.setView(e.latlng, parentMap.getZoom());
	}

	function onChangeParentMap() {
		bounds = parentMap.getBounds();
		miniMap.setView(parentMap.getCenter(), miniMap.getZoom());
	}

	$: if (parentMap) {
		bounds = parentMap.getBounds();
	}
</script>

<div style="width: 100%;height: 500px;">
	<Map
		options={{ center: [51.505, -0.09], zoom: 6, scrollWheelZoom: false }}
		bind:instance={parentMap}
		on:move={onChangeParentMap}
		on:zoom={onChangeParentMap}
	>
		<TileLayer
			options={{
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}}
			urlTemplate={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
		/>
		<Control options={{ position: 'topright' }} class="leaflet-bar">
			<div style="width:80px;height:80px;">
				<Map
					bind:instance={miniMap}
					options={{
						center: mapCenter,
						zoom: 0,
						dragging: false,
						doubleClickZoom: false,
						scrollWheelZoom: false,
						attributionControl: false,
						zoomControl: false
					}}
				>
					<TileLayer urlTemplate={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'} />
					<Rectangle latLngBounds={bounds} options={{ weight: 1 }} />
				</Map>
			</div>
		</Control>
	</Map>
</div>

<style>
	:global(.leaflet-bar) {
		border: 2px solid rgba(0, 0, 0, 0.2);
		background-clip: padding-box;
	}
</style>
```
