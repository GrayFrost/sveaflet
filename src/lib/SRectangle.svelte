<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Rectangle, Map } from 'leaflet';
	import type { LatLngBoundsExpression, PathOptions, PolylineOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils';

	// props
	export let bounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};
	export let instance: Rectangle | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let rectangle: Rectangle | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = rectangle;

	onMount(() => {
		rectangle = new Rectangle(bounds, options);
		compare = new Compare(rectangle, $$props);
		ready = true;
	});

	$: if (map) {
		if (rectangle) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(rectangle);
			} else {
				map.addLayer(rectangle);
			}

			compare.storeProps($$props);
		}
	}

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
	<slot />
{/if}
