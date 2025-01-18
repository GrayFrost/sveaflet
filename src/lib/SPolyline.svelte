<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Polyline, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLngs: LatLngExpression[];
		options?: PolylineOptions;
		instance?: Polyline;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { latLngs, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	let latestProps = $derived.by(() => ({
		latLngs,
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let polyline: Polyline | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Polyline> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = polyline;
	});

	onMount(() => {
		polyline = new Polyline(latLngs, options);
		eventBridge = new EventBridge(polyline);
		eventBridge.addEvents(restProps);
		compare = new Compare(polyline, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (polyline) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(polyline);
				} else {
					map.addLayer(polyline);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		polyline?.remove();
		polyline = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => polyline });
</script>

{#if ready}
	{@render children?.()}
{/if}
