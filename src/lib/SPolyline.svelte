<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Polyline, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let latLngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let polyline: Polyline | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = polyline;

	onMount(() => {
		polyline = new Polyline(latLngs, options);
		compare = new Compare(polyline, $$props);
		ready = true;
	});

	$: if (map) {
		if (polyline) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(polyline);
			} else {
				map.addLayer(polyline);
			}
			
			compare.storeProps($$props);
		}
	}

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
	<slot />
{/if}
