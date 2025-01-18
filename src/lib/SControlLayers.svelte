<script lang="ts">
	import { onMount, onDestroy, getContext, setContext, type Snippet } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		options?: Control.LayersOptions;
		instance?: Control.Layers;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	let latestProps = $derived.by(() => ({
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let ready = $state(false);
	let controlLayers: Control.Layers | undefined = $state();
	let compare: Compare | undefined;

	let map: Map | undefined = $derived(getMap?.());

	$effect(() => {
		instance = controlLayers;
	});

	onMount(() => {
		controlLayers = control.layers(undefined, undefined, options);
		compare = new Compare(controlLayers, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (controlLayers) {
				compare?.updateProps(latestProps);
				controlLayers.addTo(map);
				compare?.storeProps(latestProps);
			}
		}
	});

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
	{@render children?.()}
{/if}
