<script lang="ts">
	import { onDestroy, onMount, setContext, getContext, type Snippet } from 'svelte';
	import { Map, SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		bounds: LatLngBounds;
		options?: ImageOverlayOptions;
		instance?: SVGOverlay;
		children?: Snippet;
	} & HTMLAttributes<SVGElement> & { [key: string]: unknown };

	let { bounds, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	let latestProps = $derived.by(() => ({
		bounds,
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let svgOverlay: SVGOverlay | undefined = $state();
	let compare: Compare | undefined = $state.raw();
	let eventBridge: EventBridge<SVGOverlay> | undefined;

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	// refs
	let svgElement: SVGElement | undefined = $state();

	$effect(() => {
		instance = svgOverlay;
	});

	onMount(() => {
		if (svgElement) {
			svgOverlay = new SVGOverlay(svgElement, bounds, options);
		} else {
			throw new Error('SVG Element Required!');
		}
		eventBridge = new EventBridge(svgOverlay);
		eventBridge.addEvents(restProps);
		compare = new Compare(svgOverlay, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (svgOverlay) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(svgOverlay);
				} else {
					map.addLayer(svgOverlay);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		svgOverlay?.remove();
		svgOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => svgOverlay });
</script>

<svg bind:this={svgElement} xmlns="http://www.w3.org/2000/svg" {...restProps}>
	{#if ready}
		{@render children?.()}
	{/if}
</svg>
