---
layout: componentLayout
breadcrumb_title: Scale
title: Controls.Scale
component_title: ControlScale
dir: Components
description: Controls.Scale
---

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
