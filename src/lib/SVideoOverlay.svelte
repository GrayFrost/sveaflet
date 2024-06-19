<script lang="ts">
	import { onDestroy } from 'svelte';
	import { VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	export let video: string | string[] = [];
	export let bounds: LatLngBounds;
	export let options: VideoOverlayOptions = {};
	export let instance: VideoOverlay | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	let videoOverlay: VideoOverlay | undefined;
	let htmlVideoElement: HTMLVideoElement | undefined;

	$: if ($mapStore) {
		let mergeVideo = htmlVideoElement || video;
		reset();
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer(videoOverlay);
		} else {
			videoOverlay.addTo($mapStore);
		}
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

{#if $$slots.default}
	<video bind:this={htmlVideoElement} {...$$restProps}>
		<slot />
	</video>
{/if}
