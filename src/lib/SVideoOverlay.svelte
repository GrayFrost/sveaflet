<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { Map, VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		url?: string;
		bounds: LatLngBounds;
		options?: VideoOverlayOptions;
		instance?: VideoOverlay;
		children?: Snippet;
	} & HTMLAttributes<HTMLVideoElement> & { [key: string]: unknown };

	let {
		url = '',
		bounds,
		options = {},
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	let latestProps = $derived.by(() => ({
		url,
		bounds,
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let videoOverlay: VideoOverlay | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<VideoOverlay> | undefined;

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	// refs
	let htmlVideoElement: HTMLVideoElement | undefined = $state();

	$effect(() => {
		instance = videoOverlay;
	});

	onMount(() => {
		let mergeVideo = htmlVideoElement || url;
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);
		eventBridge = new EventBridge(videoOverlay);
		eventBridge.addEvents(restProps);
		compare = new Compare(videoOverlay, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (videoOverlay) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(videoOverlay);
				} else {
					map.addLayer(videoOverlay);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		videoOverlay?.remove();
		videoOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => videoOverlay });
</script>

{#if children}
	<!-- svelte-ignore a11y_media_has_caption -->
	<video bind:this={htmlVideoElement} {...restProps}>
		{#if ready}
			{@render children()}
		{/if}
	</video>
{/if}
