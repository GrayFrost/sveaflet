<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let video: string | string[] = [];
	export let bounds: LatLngBounds;
	export let options: VideoOverlayOptions = {};
	export let instance: VideoOverlay | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let videoOverlay: VideoOverlay | undefined;
	let htmlVideoElement: HTMLVideoElement | undefined;
	let preVideo = video;
	let preBounds = bounds;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = videoOverlay;

	onMount(() => {
		let mergeVideo = htmlVideoElement || video;
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);

		storeProps({
			video,
			bounds,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (videoOverlay) {
			updateUrl(videoOverlay, preVideo, video);
			updateBounds(videoOverlay, preBounds, bounds);
			updateZIndex(videoOverlay, preOptions, options);
			updateOpacity(videoOverlay, preOptions, options);

			if (layer) {
				layer.addLayer(videoOverlay);
			} else {
				map.addLayer(videoOverlay);
			}
			storeProps({
				video,
				bounds,
				options
			});
		}
	}

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

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => videoOverlay }));
</script>

{#if $$slots.default}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={htmlVideoElement} {...$$restProps}>
		{#if ready}
			<slot />
		{/if}
	</video>
{/if}
