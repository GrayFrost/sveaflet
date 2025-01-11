<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { Rectangle, Map } from 'leaflet';
	import type { LatLngBoundsExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, bindEvents } from './utils/index';

	// props
	type Props = {
		bounds: LatLngBoundsExpression;
		options?: PolylineOptions;
		instance?: Rectangle;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { bounds, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let rectangle: Rectangle | undefined = $state();
	let compare: Compare | undefined = $state();

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = rectangle;
	});

	onMount(() => {
		const props = {
			bounds,
			options,
			...restProps
		};
		rectangle = new Rectangle(bounds, options);
		bindEvents(rectangle, restProps);
		compare = new Compare(rectangle, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (rectangle) {
				const props = {
					bounds,
					options,
					...restProps
				};
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(rectangle);
				} else {
					map.addLayer(rectangle);
				}

				compare?.storeProps(props);
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
