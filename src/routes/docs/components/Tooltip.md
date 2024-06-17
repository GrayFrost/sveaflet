---
layout: componentLayout
breadcrumb_title: Tooltip
title: Tooltip
component_title: Tooltip
dir: Components
description: Tooltip
---

# Tooltip

## Default

```svelte example csr
<script>
	import { Map, TileLayer, Tooltip } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Tooltip latlng={[51.505, -0.09]} options={{ content: 'Tooltip content.' }} />
	</Map>
</div>
```

## Layer bind tooltip

```svelte example csr
<script>
	import { Map, TileLayer, Marker, Circle, Tooltip } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<Marker latlng={[51.5, -0.09]}>
			<Tooltip options={{ content: 'Tooltip in Marker.' }} />
		</Marker>
		<Circle
			latlng={[51.508, -0.11]}
			options={{
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: 500
			}}
		>
			<Tooltip options={{ content: 'Tooltip in Circle.' }} />
		</Circle>
	</Map>
</div>
```

//todo doc
