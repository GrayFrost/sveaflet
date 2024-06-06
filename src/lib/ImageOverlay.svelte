<script lang="ts">
	import { useConsumeMap } from './context.ts';
	import {
		ImageOverlay,
		type LatLngBoundsExpression,
		type ImageOverlayOptions
	} from 'leaflet?client';

	let { map: mapStore } = useConsumeMap();

	export let imageUrl: string;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};

	if ($mapStore) {
		let imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		imageOverlay.addTo($mapStore);
	}
</script>
