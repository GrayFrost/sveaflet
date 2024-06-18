<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { SVGOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};
	export let instance: SVGOverlay | undefined = undefined;

	let mapStore = useConsumeMap();
	let svgImage: string | SVGElement;
	let svgOverlay: SVGOverlay | undefined;

	$: if ($mapStore) {
		reset();
		if (!svgImage) {
			console.warn('SVG Elements Required!');
		} else {
			svgOverlay = new SVGOverlay(svgImage, bounds, options);
			svgOverlay.addTo($mapStore);
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

<svg bind:this={svgImage} xmlns="http://www.w3.org/2000/svg">
	<slot />
</svg>
