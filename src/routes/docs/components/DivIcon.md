---
layout: componentLayout
breadcrumb_title: DivIcon
title: DivIcon
component_title: DivIcon
dir: Components
description: DivIcon
---

# Icon

```svelte example csr
<script>
	import { Map, Marker, DivIcon } from 'sveaflet';
</script>

<div style="width: 100%;height: 500px;">
	<Map options={{ center: [51.505, -0.09], zoom: 13 }}>
		<Marker latlng={[51.5, -0.09]}>
			<DivIcon
				options={{
					className: 'my-div-icon'
				}}
			>
        <div>DivIcon</div>
      </DivIcon>
		</Marker>
	</Map>
</div>

<style>
  :global(.my-div-icon) {
    width: 50px !important;
    height: 50px !important;
    background: red;
  }
</style>
```
