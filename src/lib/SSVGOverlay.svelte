<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: SVGOverlay | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	let svgOverlay: SVGOverlay | undefined;
	let svgElement: SVGElement | undefined;

	let preOptions: ImageOverlayOptions = {};

	onMount(() => {
		if (svgElement) {
			svgOverlay = new SVGOverlay(svgElement, bounds, options);
		} else {
			console.warn('SVG Element Required!');
		}
		preOptions = Object.create(options);
	});

	$: if ($mapStore) {
		if (svgOverlay) {
			// TODO: how to update all options?
			if (options.zIndex !== preOptions.zIndex && options.zIndex !== undefined) {
				svgOverlay.setZIndex(options.zIndex);
			}

			if (options.opacity !== preOptions.opacity && options.opacity !== undefined) {
				svgOverlay.setOpacity(options.opacity);
			}

			if ($layerGroupStore) {
				$layerGroupStore.addLayer(svgOverlay);
			} else {
				svgOverlay.addTo($mapStore);
			}

			preOptions = Object.create(options);
		}
	}

	$: instance = svgOverlay;

	function reset() {
		svgOverlay?.remove();
		svgOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

<svg bind:this={svgElement} xmlns="http://www.w3.org/2000/svg" {...$$restProps}>
	<slot />
</svg>
