---
layout: componentLayout
breadcrumb_title: Interactive Choropleth Map
title: Interactive Choropleth Map
component_title: Interactive Choropleth Map
dir: Examples
description: This is a case study of creating a colorful interactive choropleth map of US States Population Density with the help of GeoJSON and some custom controls (that will hopefully convince all the remaining major news and government websites that do not use Leaflet yet to start doing so).
---

The tutorial was inspired by the Texas Tribune US Senate Runoff Results map (also powered by Leaflet), created by Ryan Murphy.

## Demo

```svelte example csr
<script>
  import { Map, GeoJSON, ControlAttribution } from 'sveaflet';
  import { statesData } from '/us-state.js?url';

  console.log('zzh data', statesData);

  function getColor(d) {
		return d > 1000 ? '#800026' :
			d > 500  ? '#BD0026' :
			d > 200  ? '#E31A1C' :
			d > 100  ? '#FC4E2A' :
			d > 50   ? '#FD8D3C' :
			d > 20   ? '#FEB24C' :
			d > 10   ? '#FED976' : '#FFEDA0';
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
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [37.8, -96], zoom: 4, attributionControl: false, }}>
    <GeoJSON json={statesData} options={{
      style
    }} />
    <ControlAttribution />
  </Map>
</div>
```