<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { Map, VideoOverlay } from 'leaflet';
	import type { LatLngBounds, VideoOverlayOptions } from 'leaflet';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

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

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let videoOverlay: VideoOverlay | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	// refs
	let htmlVideoElement: HTMLVideoElement | undefined = $state();

	$effect(() => {
		instance = videoOverlay;
	});

	onMount(() => {
		const props = {
			url,
			bounds,
			options,
			...restProps,
		};
		let mergeVideo = htmlVideoElement || url;
		videoOverlay = new VideoOverlay(mergeVideo, bounds, options);
		compare = new Compare(videoOverlay, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (videoOverlay) {
				const props = {
					url,
					bounds,
					options,
					...restProps,
				};
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(videoOverlay);
				} else {
					map.addLayer(videoOverlay);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
