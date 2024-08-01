<script lang="ts">
	import { onDestroy, onMount, setContext, getContext } from 'svelte';
	import { Circle, Map } from 'leaflet';
	import type { LatLngExpression, CircleOptions, PathOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let latLng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let circle: Circle | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = circle;

	onMount(() => {
		circle = new Circle(latLng, options);
		compare = new Compare(circle, $$props);
		ready = true;
	});

	$: if (map) {
		if (circle) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(circle);
			} else {
				map.addLayer(circle);
			}
			
			compare.storeProps($$props);
		}
	}

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
	<slot />
{/if}
