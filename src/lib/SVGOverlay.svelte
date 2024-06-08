<script lang="ts">
	import { SVGOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let svgImage: string | SVGElement;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};

	if ($mapStore) {
		let svgOverlay = new SVGOverlay(svgImage, bounds, options);
	}
</script>

<slot />
