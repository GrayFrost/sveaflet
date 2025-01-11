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
	};

	let { options = {}, instance = $bindable(), ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let scale: Control.Scale | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	let map: Map | undefined = $derived(getMap?.());

	$effect(() => {
		instance = scale;
	});

	onMount(() => {
		const props = {
			options,
			...restProps
		};
		scale = control.scale(options);
		compare = new Compare(scale, props);
	});

	$effect(() => {
		if (map) {
			if (scale) {
				const props = {
					options,
					...restProps
				};
				
				compare?.updateProps(props);
				map.addControl(scale);
				compare?.storeProps(props);
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
