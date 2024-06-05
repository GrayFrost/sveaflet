<script lang="ts">
	import { useConsumeMap } from './context.ts';
	import {
		VideoOverlay,
		type LatLngBoundsExpression,
		type VideoOverlayOptions
	} from 'leaflet?client';

	let mapStore = useConsumeMap();

	export let video: string | string[]; // todoHTMLVideoElement,
  export let bounds: LatLngBoundsExpression;
  export let options: VideoOverlayOptions = {};

	if ($mapStore) {
		let videoOverlay = new VideoOverlay(video, bounds, options);
		videoOverlay.addTo($mapStore);
	}
</script>

<slot />
