<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		options?: Control.ScaleOptions;
		instance?: Control.Scale;
	} & { [key: string]: unknown };

	let { options = {}, instance = $bindable(), ...restProps }: Props = $props();

	let latestProps = $derived.by(() => ({
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let scale: Control.Scale | undefined = $state();
	let compare: Compare | undefined;

	let map: Map | undefined = $derived(getMap?.());

	$effect(() => {
		instance = scale;
	});

	onMount(() => {
		scale = control.scale(options);
		compare = new Compare(scale, latestProps);
	});

	$effect(() => {
		if (map) {
			if (scale) {
				compare?.updateProps(latestProps);
				map.addControl(scale);
				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		scale?.remove();
		scale = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
