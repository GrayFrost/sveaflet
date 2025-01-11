<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		options?: Control.AttributionOptions;
		instance?: Control.Attribution;
	};

	let { options = {}, instance = $bindable(), ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let attribution: Control.Attribution | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	let map: Map | undefined = $derived(getMap?.());

	$effect(() => {
		instance = attribution;
	});

	onMount(() => {
		const props = {
			options,
			...restProps
		};
		attribution = control.attribution(options);
		compare = new Compare(attribution, props);
	});

	$effect(() => {
		if (map) {
			if (attribution) {
				const props = {
					options,
					...restProps
				};
				compare?.updateProps(props);
				map.addControl(attribution);
				compare?.storeProps(props);
			}
		}
	});

	function reset() {
		attribution?.remove();
		attribution = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
