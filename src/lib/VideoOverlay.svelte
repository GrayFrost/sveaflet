<script lang="ts">
	import { onDestroy } from 'svelte';
	import { VideoOverlay } from 'leaflet';
	import type { LatLngBoundsExpression, VideoOverlayOptions } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let video: string | string[]; // todoHTMLVideoElement,
	export let bounds: LatLngBoundsExpression;
	export let options: VideoOverlayOptions = {};
	export let instance: VideoOverlay | undefined = undefined;

	let mapStore = useConsumeMap();

	let videoOverlay: VideoOverlay | undefined;

	$: if ($mapStore) {
		reset();
		videoOverlay = new VideoOverlay(video, bounds, options);
		videoOverlay.addTo($mapStore);
	}

	$: instance = videoOverlay;

	function reset() {
		videoOverlay?.remove();
		videoOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

<slot />
