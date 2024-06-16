---
layout: componentLayout
breadcrumb_title: Circle
title: Circle
component_title: Circle
dir: Components
description: Circle
---

test test test testeserwt

testewetwet wetwetwetwe

## Setup

```svelte example csr hideOutput
<script>
	import { Circle } from 'sveaflet';
</script>
```

## Default Circle

```svelte example csr
<script>
	import { Map, Circle } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		/>
	</Map>
</div>
```

## Circle with Popup

```svelte example csr
<script>
	import { Map, Circle, Popup } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		>
			<Popup options={{ content: 'Popup in Circle.' }} />
		</Circle>
	</Map>
</div>
```

## Props
| Prop name | Description | Type | Default |
| --- | --- | --- | --- |
| latlng    |  | [LatLng](https://leafletjs.com/reference.html#latlng) | |
| options   |  | [CircleOptions](https://leafletjs.com/reference.html#circle-option) | `{ radius: 1 }` |

## Events
