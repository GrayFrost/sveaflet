---
layout: componentLayout
breadcrumb_title: VideoOverlay
title: VideoOverlay
component_title: VideoOverlay
dir: Components
description: VideoOverlay
---

# VideoOverlay

```svelte example csr
<script>
	import { Map, VideoOverlay } from 'sveaflet';
</script>

<div style="width: 100%; height: 500px; ">
	<Map options={{ center: [40.799311, -74.33], zoom: 10 }}>
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
      }}
		/>
	</Map>
</div>
```
