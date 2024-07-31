<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Polygon, Map } from 'leaflet';
	import type { LatLngExpression, PolylineOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils';

	// props
	export let latLngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let polygon: Polygon | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = polygon;

	onMount(() => {
		polygon = new Polygon(latLngs, options);
		compare = new Compare(polygon, $$props);
		ready = true;
	});

	$: if (map) {
		if (polygon) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(polygon);
			} else {
				map.addLayer(polygon);
			}

			compare.storeProps($$props);
		}
	}

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
	<slot />
{/if}
