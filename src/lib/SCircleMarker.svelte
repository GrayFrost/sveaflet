<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { CircleMarker, Map } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		latLng: LatLngExpression;
		options: CircleMarkerOptions;
		instance: CircleMarker | undefined;
		children: Snippet;
	};

	let {
		latLng,
		options = { radius: 10 },
		instance = $bindable(undefined),
		children
	}: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let circleMarker: CircleMarker | undefined = $state();
	let map: Map | undefined = $state();
	let layer: LayerGroup | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
		layer = getLayer?.();
	});

	$effect(() => {
		instance = circleMarker;
	});

	onMount(() => {
		const props = {
			latLng,
			options
		};
		circleMarker = new CircleMarker(latLng, options);
		compare = new Compare(circleMarker, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (circleMarker) {
				const props = {
					latLng,
					options
				};
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(circleMarker);
				} else {
					map.addLayer(circleMarker);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
