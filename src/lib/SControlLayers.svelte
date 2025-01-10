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
	};

	let { options = {}, instance = $bindable(), children }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let ready = $state(false);
	let controlLayers: Control.Layers | undefined = $state();
	let map: Map | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
	});

	$effect(() => {
		instance = controlLayers;
	});

	onMount(() => {
		const props = {
			options
		};
		controlLayers = control.layers(undefined, undefined, options);
		compare = new Compare(controlLayers, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (controlLayers) {
				const props = {
					options
				};
				compare?.updateProps(props);
				controlLayers.addTo(map);
				compare?.storeProps(props);
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
