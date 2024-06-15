---
layout: componentLayout
breadcrumb_title: SVGOverlay
title: SVGOverlay
component_title: SVGOverlay
dir: Components
description: SVGOverlay

---

# SVGOverlay

```svelte example csr
<script>
	import { Map, SVGOverlay } from 'sveaflet';
</script>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [32, -130], zoom: 4 }}>
		<SVGOverlay
			bounds={[
				[32, -130],
				[13, -100]
			]}
      options={{
        opacity: 0.7
      }}
		>
			<rect width="200" height="200" />
			<rect x="75" y="23" width="50" height="50" style="fill:red" />
			<rect x="75" y="123" width="50" height="50" style="fill:#0013ff" />
		</SVGOverlay>
	</Map>
</div>
```
