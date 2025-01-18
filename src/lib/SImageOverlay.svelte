<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, ImageOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		url: string;
		bounds: LatLngBounds;
		options?: ImageOverlayOptions;
		instance?: ImageOverlay;
	} & { [key: string]: unknown };

	let { url, bounds, options = {}, instance = $bindable(), ...restProps }: Props = $props();

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
	let imageOverlay: ImageOverlay | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<ImageOverlay> | undefined;

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	$effect(() => {
		instance = imageOverlay;
	});

	onMount(() => {
		imageOverlay = new ImageOverlay(url, bounds, options);
		eventBridge = new EventBridge(imageOverlay);
		eventBridge.addEvents(restProps);
		compare = new Compare(imageOverlay, latestProps);
	});

	$effect(() => {
		if (map) {
			if (imageOverlay) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(imageOverlay);
				} else {
					map.addLayer(imageOverlay);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		imageOverlay?.remove();
		imageOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => imageOverlay });
</script>
