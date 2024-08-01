<script lang="ts">
	import { onDestroy, onMount, setContext, getContext } from 'svelte';
	import { Map, SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions, SVGOverlayStyleOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: SVGOverlay | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let svgOverlay: SVGOverlay | undefined;
	let svgElement: SVGElement | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = svgOverlay;

	onMount(() => {
		if (svgElement) {
			svgOverlay = new SVGOverlay(svgElement, bounds, options);
		} else {
			throw new Error('SVG Element Required!');
		}
		compare = new Compare(svgOverlay, options);
		ready = true;
	});

	$: if (map) {
		if (svgOverlay) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(svgOverlay);
			} else {
				map.addLayer(svgOverlay);
			}

			compare.storeProps($$props);
		}
	}

	function reset() {
		svgOverlay?.remove();
		svgOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => svgOverlay });
</script>

<svg bind:this={svgElement} xmlns="http://www.w3.org/2000/svg" {...$$restProps}>
	{#if ready}
		<slot />
	{/if}
</svg>
