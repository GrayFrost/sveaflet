<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

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
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = videoOverlay;

	onMount(() => {
		let mergeVideo = htmlVideoElement || url;
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);
		compare = new Compare(videoOverlay, $$props);
		ready = true;
	});

	$: if (map) {
		if (videoOverlay) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(videoOverlay);
			} else {
				map.addLayer(videoOverlay);
			}

			compare.storeProps($$props);
		}
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
