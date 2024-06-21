---
layout: componentLayout
breadcrumb_title: VideoOverlay
title: VideoOverlay - Sveaflet
component_title: VideoOverlay
dir: Components
description: Raster Layers - VideoOverlay
---

Used to load and display a video player over specific bounds of the map. Extends [ImageOverlay](https://leafletjs.com/reference.html#imageoverlay).

A video overlay uses the [`<video>`](https://developer.mozilla.org/docs/Web/HTML/Element/video) HTML5 element.

## Setup

```svelte example csr hideOutput
<script>
	import { VideoOverlay } from 'sveaflet';
</script>
```

## Default VideoOverlay

```svelte example csr
<script>
	import { Map, TileLayer, VideoOverlay } from 'sveaflet';
</script>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [40.799311, -74.33], zoom: 10 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<VideoOverlay
			video={[
				'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
				'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
			]}
			bounds={[
				[40.799311, -74.118464],
				[40.68202047785919, -74.33]
			]}
		/>
	</Map>
</div>
```

## VideoOverlay with Options

```svelte example csr
<script>
	import { Map, TileLayer, VideoOverlay } from 'sveaflet';
	import { Label, Toggle } from 'flowbite-svelte';

	let enableOpacity = true;
</script>

<div class="flex items-center gap-4 mb-4">
	<Label>Enable Opacity:</Label>
	<Toggle bind:checked={enableOpacity} />
</div>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [40.799311, -74.33], zoom: 10 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<VideoOverlay
			video={[
				'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
				'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
			]}
			bounds={[
				[40.799311, -74.118464],
				[40.68202047785919, -74.33]
			]}
			options={{
				muted: true,
				autoplay: true,
				loop: true,
				opacity: enableOpacity ? 0.5 : 1
			}}
		></VideoOverlay>
	</Map>
</div>
```

## VideoOverlay with slot content

```svelte example csr
<script>
	import { Map, TileLayer, VideoOverlay } from 'sveaflet';
</script>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [40.799311, -74.33], zoom: 10 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<VideoOverlay
			bounds={[
				[40.799311, -74.118464],
				[40.68202047785919, -74.33]
			]}
			options={{
				muted: true,
				autoplay: true,
				loop: true,
				interactive: true
			}}
			width={500}
			controls={true}
		>
			<source src="https://www.mapbox.com/bites/00188/patricia_nasa.webm" type="video/webm" />
			<source src="https://www.mapbox.com/bites/00188/patricia_nasa.mp4" type="video/mp4" />
		</VideoOverlay>
	</Map>
</div>
```

## Props

| Prop name | Description                                                | Type                                                                                | Default |
| --------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------- |
| video     | **Required**. **Optional** when provide video element slot | string \| string[]                                                                  | `[]`    |
| bounds    | **Required**                                               | [LatLngBounds](https://leafletjs.com/reference.html#latLngbounds)                   |         |
| options   | **Optional**                                               | [Control.LayersOptions](https://leafletjs.com/reference.html#control-layers-option) | `{}`    |
