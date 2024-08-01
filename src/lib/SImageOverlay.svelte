<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, ImageOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let url: string;
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: ImageOverlay | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let imageOverlay: ImageOverlay | undefined;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = imageOverlay;

	onMount(() => {
		imageOverlay = new ImageOverlay(url, bounds, options);
		compare = new Compare(imageOverlay, $$props);
	});

	$: if (map) {
		if (imageOverlay) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(imageOverlay);
			} else {
				map.addLayer(imageOverlay);
			}
			
			compare.storeProps($$props);
		}
	}

	function reset() {
		imageOverlay?.remove();
		imageOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => imageOverlay });
</script>
