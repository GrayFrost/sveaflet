<script lang="ts">
	import { onDestroy } from 'svelte';
	import { VideoOverlay } from 'leaflet';
	import type { LatLngBoundsExpression, VideoOverlayOptions } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	let { map: mapStore } = useConsumeMap();

	export let video: string | string[]; // todoHTMLVideoElement,
	export let bounds: LatLngBoundsExpression;
	export let options: VideoOverlayOptions = {};

	let videoOverlay: VideoOverlay | undefined;

	if ($mapStore) {
		videoOverlay = new VideoOverlay(video, bounds, options);
		videoOverlay.addTo($mapStore);
	}

	onDestroy(() => {
		videoOverlay?.remove();
		videoOverlay = undefined;
	});
</script>

<slot />
