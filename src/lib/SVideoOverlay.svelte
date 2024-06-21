<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	// props
	export let video: string | string[] = [];
	export let bounds: LatLngBounds;
	export let options: VideoOverlayOptions = {};
	export let instance: VideoOverlay | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	// data
	let videoOverlay: VideoOverlay | undefined;
	let htmlVideoElement: HTMLVideoElement | undefined;
	let preVideo = video;
	let preBounds = bounds;
	let preOptions = options;

	onMount(() => {
		let mergeVideo = htmlVideoElement || video;
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);

		storeProps({
			video,
			bounds,
			options
		});
	});

	$: if ($mapStore) {
		if (videoOverlay) {
			updateUrl(videoOverlay, preVideo, video);
			updateBounds(videoOverlay, preBounds, bounds);
			updateZIndex(videoOverlay, preOptions, options);
			updateOpacity(videoOverlay, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer(videoOverlay);
			} else {
				videoOverlay.addTo($mapStore);
			}
			storeProps({
				video,
				bounds,
				options
			});
		}
	}

	$: instance = videoOverlay;

	function updateUrl(obj: VideoOverlay, preVideo: string | string[], video: string | string[]) {
		if (video !== preVideo && video !== undefined) {
			if (Array.isArray(video) && video.length) {
				obj.setUrl(video[0]);
			}
			if (typeof video === 'string') {
				obj.setUrl(video);
			}
		}
	}

	function updateBounds(obj: VideoOverlay, preBounds: LatLngBounds, bounds: LatLngBounds) {
		if (bounds !== preBounds && bounds !== undefined) {
			obj.setBounds(bounds);
		}
	}

	function updateZIndex(obj: VideoOverlay, preOpt: VideoOverlayOptions, opt: VideoOverlayOptions) {
		if (opt.zIndex !== preOpt.zIndex && opt.zIndex !== undefined) {
			obj.setZIndex(opt.zIndex);
		}
	}

	function updateOpacity(obj: VideoOverlay, preOpt: VideoOverlayOptions, opt: VideoOverlayOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity) {
			obj.setOpacity(opt.opacity);
		}
	}

	function storeProps(props: {
		video: string | string[];
		bounds: LatLngBounds;
		options: VideoOverlayOptions;
	}) {
		const { video, bounds, options } = props;
		preVideo = video;
		preBounds = bounds;
		preOptions = options;
	}

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
