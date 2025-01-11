<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Polygon, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, bindEvents } from './utils/index';

	// props
	type Props = {
		latLngs: LatLngExpression[];
		options?: PolylineOptions;
		instance?: Polygon;
		children?: Snippet;
	};

	let { latLngs, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let polygon: Polygon | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = polygon;
	});

	onMount(() => {
		const props = {
			latLngs,
			options,
			...restProps
		};
		polygon = new Polygon(latLngs, options);
		bindEvents(polygon, restProps);
		compare = new Compare(polygon, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (polygon) {
				const props = {
					latLngs,
					options,
					...restProps
				};
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(polygon);
				} else {
					map.addLayer(polygon);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
