<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { Rectangle, Map } from 'leaflet';
	import type { LatLngBoundsExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		bounds: LatLngBoundsExpression;
		options?: PolylineOptions;
		instance?: Rectangle;
		children?: Snippet;
	} & { [key: string]: unknown };

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
	let rectangle: Rectangle | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Rectangle> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = rectangle;
	});

	onMount(() => {
		rectangle = new Rectangle(bounds, options);
		eventBridge = new EventBridge(rectangle);
		eventBridge.addEvents(restProps);
		compare = new Compare(rectangle, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (rectangle) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(rectangle);
				} else {
					map.addLayer(rectangle);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
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
