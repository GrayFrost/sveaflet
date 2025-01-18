<script lang="ts">
	import { onDestroy, onMount, setContext, getContext, type Snippet } from 'svelte';
	import { Circle, Map } from 'leaflet';
	import type { LatLngExpression, CircleOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLng: LatLngExpression;
		options?: CircleOptions;
		instance?: Circle;
		children?: Snippet;
	} & { [key: string]: unknown };

	let {
		latLng,
		options = { radius: 100 },
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	let latestProps = $derived.by(() => ({
		latLng,
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let circle: Circle | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Circle> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = circle;
	});

	onMount(() => {
		circle = new Circle(latLng, options);
		eventBridge = new EventBridge(circle);
		eventBridge.addEvents(restProps);
		compare = new Compare(circle, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (circle) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(circle);
				} else {
					map.addLayer(circle);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		circle?.remove();
		circle = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => circle });
</script>

{#if ready}
	{@render children?.()}
{/if}
