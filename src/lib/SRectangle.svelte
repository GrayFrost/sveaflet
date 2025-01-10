<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { Rectangle, Map } from 'leaflet';
	import type { LatLngBoundsExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		bounds: LatLngBoundsExpression;
		options: PolylineOptions;
		instance: Rectangle | undefined;
		children: Snippet;
	};

	let { bounds, options = {}, instance = $bindable(undefined), children }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);

	// object
	let rectangle: Rectangle | undefined;
	let compare: Compare;
	let map: Map | undefined;
	let layer: LayerGroup | undefined;

	$effect(() => {
		map = getMap?.();
	});

	$effect(() => {
		layer = getLayer?.();
	});

	$effect(() => {
		instance = rectangle;
	});

	onMount(() => {
		const props = {
			bounds,
			options
		};
		rectangle = new Rectangle(bounds, options);
		compare = new Compare(rectangle, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (rectangle) {
				const props = {
					bounds,
					options
				};
				compare.updateProps(props);

				if (layer) {
					layer.addLayer(rectangle);
				} else {
					map.addLayer(rectangle);
				}

				compare.storeProps(props);
			}
		}
	});

	function reset() {
		rectangle?.remove();
		rectangle = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => rectangle });
</script>

{#if ready}
	{@render children?.()}
{/if}
