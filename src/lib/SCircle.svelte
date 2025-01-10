<script lang="ts">
	import { onDestroy, onMount, setContext, getContext, type Snippet } from 'svelte';
	import { Circle, Map } from 'leaflet';
	import type { LatLngExpression, CircleOptions, LayerGroup } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		latLng: LatLngExpression;
		options: CircleOptions;
		instance: Circle | undefined;
		children: Snippet;
	};

	let {
		latLng,
		options = { radius: 100 },
		instance = $bindable(undefined),
		children
	}: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);

	// object
	let circle: Circle | undefined;
	let compare: Compare;
	let map: Map | undefined;
	let layer: LayerGroup | undefined;

	$effect(() => {
		map = getMap?.();
	});

	$effect(() => {
		layer = getLayer?.();
	});

	$effect(() => {
		instance = circle;
	});

	onMount(() => {
		const props = {
			latLng,
			options
		};
		circle = new Circle(latLng, options);
		compare = new Compare(circle, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (circle) {
				const props = {
					latLng,
					options
				};
				compare.updateProps(props);

				if (layer) {
					layer.addLayer(circle);
				} else {
					map.addLayer(circle);
				}

				compare.storeProps(props);
			}
		}
	});

	function reset() {
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
