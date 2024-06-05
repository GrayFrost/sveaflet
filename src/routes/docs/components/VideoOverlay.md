---
breadcrumb_title: VideoOverlay
title: VideoOverlay
component_title: VideoOverlay
dir: Components
description: VideoOverlay
---

# VideoOverlay

```svelte example
<script>
import { Map, TileLayer, VideoOverlay } from 'sveaflet'; 
</script>

<div style="width: 500px; height: 500px; ">

	<Map options={{ center:[37.8, -96], zoom: 4 }}>
		<TileLayer urlTemplate={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
		<VideoOverlay
			video={[
        'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
        'https://www.mapbox.com/bites/00188/patricia_nasa.mp4'
      ]}
      bounds={[[32, -130], [13, -100]]}
      options={{
        className: 'max-w-none w-16'
      }}
		/>
	</Map>

</div>
```
