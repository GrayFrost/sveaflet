<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Polygon, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLngs: LatLngExpression[];
		options?: PolylineOptions;
		instance?: Polygon;
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
	let polygon: Polygon | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Polygon> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = polygon;
	});

	onMount(() => {
		polygon = new Polygon(latLngs, options);
		eventBridge = new EventBridge(polygon);
		eventBridge.addEvents(restProps);
		compare = new Compare(polygon, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (polygon) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(polygon);
				} else {
					map.addLayer(polygon);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		polygon?.remove();
		polygon = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => polygon });
</script>

{#if ready}
	{@render children?.()}
{/if}
