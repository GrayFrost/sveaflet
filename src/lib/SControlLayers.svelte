<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: Control.LayersOptions = {};
	export let instance: Control.Layers | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let controlLayers: Control.Layers | undefined;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: instance = controlLayers;

	onMount(() => {
		controlLayers = control.layers(undefined, undefined, options);
		storeProps({
			options
		});
		ready = true;
	});

	$: if (map) {
		if (controlLayers) {
			updatePosition(controlLayers, preOptions, options);
			controlLayers.addTo(map);
			storeProps({
				options
			});
		}
	}

	function updatePosition(
		obj: Control.Layers,
		preOpt: Control.LayersOptions,
		opt: Control.LayersOptions
	) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function storeProps(props: { options: Control.LayersOptions }) {
		const { options } = props;
		preOptions = Object.create(options);
	}

	function reset() {
		controlLayers?.remove();
		controlLayers = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, Object.freeze({ ...parentContext, getControl: () => controlLayers }));
</script>

{#if ready}
	<slot />
{/if}
