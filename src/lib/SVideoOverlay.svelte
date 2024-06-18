<script lang="ts">
	import { onDestroy } from 'svelte';
	import { VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	export let video: string | string[]; // todoHTMLVideoElement,
	export let bounds: LatLngBounds;
	export let options: VideoOverlayOptions = {};
	export let instance: VideoOverlay | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	let videoOverlay: VideoOverlay | undefined;

	$: if ($mapStore) {
		if (!videoOverlay) {
			videoOverlay = new VideoOverlay(video, bounds, options);
		}

		if (Array.isArray(video)) {
			video.forEach((url) => {
				videoOverlay?.setUrl(url);
			});
		} else {
			videoOverlay.setUrl(video);
		}
		videoOverlay.setBounds(bounds);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer(videoOverlay);
		} else {
			videoOverlay.addTo($mapStore);
		}
	}

	$: instance = videoOverlay;

	onDestroy(() => {
		videoOverlay?.remove();
		videoOverlay = undefined;
	});
</script>

<slot />
