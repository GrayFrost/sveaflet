<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { CircleMarker, Map } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, PathOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let latLng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let circleMarker: CircleMarker | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = circleMarker;

	onMount(() => {
		circleMarker = new CircleMarker(latLng, options);
		compare = new Compare(circleMarker, $$props);
		ready = true;
	});

	$: if (map) {
		if (circleMarker) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(circleMarker);
			} else {
				map.addLayer(circleMarker);
			}
			
			compare.storeProps($$props);
		}
	}

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
	<slot />
{/if}
