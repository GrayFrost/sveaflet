<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Polyline, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, bindEvents } from './utils/index';

	// props
	type Props = {
		latLngs: LatLngExpression[];
		options?: PolylineOptions;
		instance?: Polyline;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { latLngs, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let polyline: Polyline | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	let map: Map | undefined = $derived(getMap?.());
	let layer: LayerGroup | undefined = $derived(getLayer?.());

	$effect(() => {
		instance = polyline;
	});

	onMount(() => {
		const props = {
			latLngs,
			options,
			...restProps,
		};
		polyline = new Polyline(latLngs, options);
		bindEvents(polyline, restProps);
		compare = new Compare(polyline, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (polyline) {
				const props = {
					latLngs,
					options,
					...restProps
				};
				
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(polyline);
				} else {
					map.addLayer(polyline);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
