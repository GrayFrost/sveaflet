<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		options?: Control.ZoomOptions;
		instance?: Control.Zoom;
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
	let zoom: Control.Zoom | undefined = $state();
	let compare: Compare | undefined;

	let map: Map | undefined = $derived(getMap?.());

	$effect(() => {
		instance = zoom;
	});

	onMount(() => {
		zoom = control.zoom(options);
		compare = new Compare(zoom, latestProps);
	});

	$effect(() => {
		if (map) {
			if (zoom) {
				compare?.updateProps(latestProps);
				map.addControl(zoom);
				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		zoom?.remove();
		zoom = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
