<script lang="ts">
	import { onDestroy, onMount, setContext, getContext, type Snippet } from 'svelte';
	import { Map, SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		bounds: LatLngBounds;
		options?: ImageOverlayOptions;
		instance?: SVGOverlay;
		children?: Snippet;
	} & HTMLAttributes<SVGElement>;

	let { bounds, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let svgOverlay: SVGOverlay | undefined = $state();
	let compare: Compare | undefined = $state.raw();
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
		compare = new Compare(svgOverlay, options);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (svgOverlay) {
				const props = {
					bounds,
					options
				};
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(svgOverlay);
				} else {
					map.addLayer(svgOverlay);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
