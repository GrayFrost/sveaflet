<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Polyline, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		latLngs: LatLngExpression[];
		options?: PolylineOptions;
		instance?: Polyline;
		children?: Snippet;
	};

	let { latLngs, options = {}, instance = $bindable(), children }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let polyline: Polyline | undefined = $state();
	let map: Map | undefined = $state();
	let layer: LayerGroup | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
		layer = getLayer?.();
	});

	$effect(() => {
		instance = polyline;
	});

	onMount(() => {
		const props = {
			latLngs,
			options
		};
		polyline = new Polyline(latLngs, options);
		compare = new Compare(polyline, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (polyline) {
				const props = {
					latLngs,
					options
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
