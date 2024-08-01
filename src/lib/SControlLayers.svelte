<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let options: Control.LayersOptions = {};
	export let instance: Control.Layers | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let controlLayers: Control.Layers | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: instance = controlLayers;

	onMount(() => {
		controlLayers = control.layers(undefined, undefined, options);
		compare = new Compare(controlLayers, $$props);
		ready = true;
	});

	$: if (map) {
		if (controlLayers) {
			compare.updateProps($$props);
			controlLayers.addTo(map);
			compare.storeProps($$props);
		}
	}

	function reset() {
		controlLayers?.remove();
		controlLayers = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getControl: () => controlLayers });
</script>

{#if ready}
	<slot />
{/if}
