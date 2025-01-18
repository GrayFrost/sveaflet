<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { CircleMarker, Map } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLng: LatLngExpression;
		options?: CircleMarkerOptions;
		instance?: CircleMarker;
		children?: Snippet;
	} & { [key: string]: unknown };

	let {
		latLng,
		options = { radius: 10 },
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
	let circleMarker: CircleMarker | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<CircleMarker> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = circleMarker;
	});

	onMount(() => {
		circleMarker = new CircleMarker(latLng, options);
		eventBridge = new EventBridge(circleMarker);
		eventBridge.addEvents(restProps);
		compare = new Compare(circleMarker, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (circleMarker) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(circleMarker);
				} else {
					map.addLayer(circleMarker);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		circleMarker?.remove();
		circleMarker = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => circleMarker });
</script>

{#if ready}
	{@render children?.()}
{/if}
