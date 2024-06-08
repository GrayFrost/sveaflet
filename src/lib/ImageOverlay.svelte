<script lang="ts">
	import { ImageOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let imageUrl: string;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};

	if ($mapStore) {
		let imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		imageOverlay.addTo($mapStore);
	}
</script>
