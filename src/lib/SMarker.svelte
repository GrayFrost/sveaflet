<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Map, Marker, Icon } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let latLng: LatLngExpression;
	export let options: MarkerOptions = {
		icon: new Icon.Default()
	};
	export let instance: Marker | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let marker: Marker | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = marker;

	onMount(() => {
		marker = new Marker(latLng, options);
		compare = new Compare(marker, $$props);
		ready = true;
	});

	$: if (map) {
		if (marker) {
			compare.updateProps($$props);

			if (layer) {
				layer.addLayer(marker);
			} else {
				map.addLayer(marker);
			}
			
			compare.storeProps($$props)
		}
	}


	function reset() {
		marker?.remove();
		marker = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => marker });
</script>

{#if ready}
	<slot />
{/if}
