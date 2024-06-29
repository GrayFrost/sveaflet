<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let url: string = '';
	export let bounds: LatLngBounds;
	export let options: VideoOverlayOptions = {};
	export let instance: VideoOverlay | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let videoOverlay: VideoOverlay | undefined;
	let htmlVideoElement: HTMLVideoElement | undefined;
	let preUrl = url;
	let preBounds = bounds;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = videoOverlay;

	onMount(() => {
		let mergeVideo = htmlVideoElement || url;
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);

		storeProps({
			url,
			bounds,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (videoOverlay) {
			updateUrl(videoOverlay, preUrl, url);
			updateBounds(videoOverlay, preBounds, bounds);
			updateZIndex(videoOverlay, preOptions, options);
			updateOpacity(videoOverlay, preOptions, options);

			if (layer) {
				layer.addLayer(videoOverlay);
			} else {
				map.addLayer(videoOverlay);
			}
			storeProps({
				url,
				bounds,
				options
			});
		}
	}

	function updateUrl(obj: VideoOverlay, preUrl: string, url: string) {
		if (url !== preUrl && url !== undefined) {
			obj.setUrl(url);
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
		url: string;
		bounds: LatLngBounds;
		options: VideoOverlayOptions;
	}) {
		const { url, bounds, options } = props;
		preUrl = url;
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

	setContext(Map, { ...parentContext, getOverlay: () => videoOverlay });
</script>

{#if $$slots.default}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={htmlVideoElement} {...$$restProps}>
		{#if ready}
			<slot />
		{/if}
	</video>
{/if}
