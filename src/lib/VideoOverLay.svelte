<script lang="ts">
	import type { LatLngBoundsExpression, VideoOverlayOptions } from 'leaflet';
	import { VideoOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	export let video: string | string[]; // todoHTMLVideoElement,
	export let bounds: LatLngBoundsExpression;
	export let options: VideoOverlayOptions = {};

	if ($mapStore) {
		let videoOverlay = new VideoOverlay(video, bounds, options);
		videoOverlay.addTo($mapStore);
	}
</script>

<slot />
