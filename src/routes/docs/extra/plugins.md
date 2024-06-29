---
layout: componentLayout
breadcrumb_title: plugins
title: Sveaflet Plugins
component_title: Sveaflet Plugins
dir: extra
description: Plugin extends Leaflet plugin
---

## Plugin list

- [sveaflet-heat](https://sveaflet-heat.vercel.app/)

## Build plugin component

In Sveaflet, when you use Svelte's `getContext`, you can get context value from parent component, then you can connect your own component with parent component.

For example:

```svelte example hideOutput csr
<script lang="ts">
	import { setContext, getContext } from 'svelte';
	import { Map } from 'leaflet';
	import type { LeafletContextInterface } from 'sveaflet';

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	$: map = getMap?.();
	$: layer = getLayer?.();


	$: if (map) {
		if (layer) {
			// add you component to parent layer
		}
	}

	// If your component is a layer, you can use setContext
	// setContext(Map, {...parentContext, getLayer: () => })
</script>

```
<br />

And this is `LeafletContextInterface` type defenition:

```javascript
export type LeafletContextInterface = Readonly<{
	getMap: () => LeafletMap | undefined;
	getLayer?: () => LayerGroup | undefined;
	getControl?: () => Control.Layers | undefined;
	getOverlay?: () => Layer | Marker | undefined;
}>;
```

