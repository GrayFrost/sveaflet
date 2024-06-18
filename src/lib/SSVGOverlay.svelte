<script lang="ts">
	import { onDestroy } from 'svelte';
	import { SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: SVGOverlay | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	let svgImage: string | SVGElement;
	let svgOverlay: SVGOverlay | undefined;

	$: if ($mapStore) {
		if (!svgImage) {
			console.warn('SVG Elements Required!');
		} else {
			if (!svgOverlay) {
				svgOverlay = new SVGOverlay(svgImage, bounds, options);
			}
			svgOverlay.setBounds(bounds);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer(svgOverlay);
			} else {
				svgOverlay.addTo($mapStore);
			}
		}
	}

	$: instance = svgOverlay;

	onDestroy(() => {
		svgOverlay?.remove();
		svgOverlay = undefined;
	});
</script>

<svg bind:this={svgImage} xmlns="http://www.w3.org/2000/svg">
	<slot />
</svg>
