<script lang="ts">
	import { onMount } from 'svelte';
	import { SVGOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	let svgImage: string | SVGElement;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};

	onMount(() => {
		if ($mapStore) {
			if (!svgImage) {
				console.warn('SVG Elements Required!');
				return;
			}
			let svgOverlay = new SVGOverlay(svgImage, bounds, options);
			svgOverlay.addTo($mapStore);
		}
	});
</script>

<svg bind:this={svgImage} xmlns="http://www.w3.org/2000/svg">
	<slot />
</svg>
