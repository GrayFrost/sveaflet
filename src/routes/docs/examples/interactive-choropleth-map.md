---
layout: componentLayout
breadcrumb_title: interactive-choropleth-map
title: Interactive Choropleth Map
component_title: Interactive Choropleth Map
dir: examples
description: This is a case study of creating a colorful interactive choropleth map of US States Population Density with the help of GeoJSON and some custom controls (that will hopefully convince all the remaining major news and government websites that do not use Leaflet yet to start doing so).
---

The tutorial was inspired by the Texas Tribune US Senate Runoff Results map (also powered by Leaflet), created by Ryan Murphy.

## Example

```svelte example csr
<script>
	import { Map, TileLayer, GeoJSON, ControlAttribution, Control } from 'sveaflet';
	import { statesData } from '../assets/us-state.js';

	let featureProperties = {};
	let geojson;
	let map;
	let attributionControl;

	const grades = [0, 10, 20, 50, 100, 200, 500, 1000];

	function getColor(d) {
		return d > 1000
			? '#800026'
			: d > 500
				? '#BD0026'
				: d > 200
					? '#E31A1C'
					: d > 100
						? '#FC4E2A'
						: d > 50
							? '#FD8D3C'
							: d > 20
								? '#FEB24C'
								: d > 10
									? '#FED976'
									: '#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.density)
		};
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();
		featureProperties = layer.feature.properties;
	}

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		featureProperties = {};
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	$: if (map) {
		map.attributionControl.addAttribution(
			'Population data &copy; <a href="http://census.gov/">US Census Bureau</a>'
		);
	}
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [37.8, -96], zoom: 4 }} bind:instance={map}>
		<TileLayer
			urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'}
			options={{
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}}
		/>
		<GeoJSON
			bind:instance={geojson}
			json={statesData}
			options={{
				style,
				onEachFeature
			}}
		/>
		<Control options={{ position: 'topright' }} class="info">
			<h4>US Population Density</h4>
			{#if Object.keys(featureProperties).length > 0}
				<b>{featureProperties.name}</b><br />${featureProperties.density} people / mi<sup>2</sup>
			{:else}
				Hover over a state
			{/if}
		</Control>
		<Control options={{ position: 'bottomright' }} class="info legend">
			{#each grades as grade, i}
				{@const from = grades[i]}
				{@const to = grades[i + 1]}
				<i style={`background:${getColor(from + 1)}`}></i>
				{from}{to ? `-${to}` : '+'} <br />
			{/each}
		</Control>
	</Map>
</div>

<style>
	:global(h1, h2, h3, h4) {
		font-weight: 700;
	}
	:global(.info) {
		padding: 6px 8px;
		font:
			14px/16px Arial,
			Helvetica,
			sans-serif;
		background: white;
		background: rgba(255, 255, 255, 0.8);
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
	}
	:global(.info h4) {
		margin: 0 0 5px;
		color: #777;
	}
	:global(.legend) {
		text-align: left;
		line-height: 18px;
		color: #555;
	}
	:global(.legend i) {
		width: 18px;
		height: 18px;
		float: left;
		margin-right: 8px;
		opacity: 0.7;
	}
</style>
```
