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
	};

	let { options = {}, instance = $bindable() }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let zoom: Control.Zoom | undefined = $state();
	let map: Map | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
	});

	$effect(() => {
		instance = zoom;
	});

	onMount(() => {
		const props = {
			options
		};

		zoom = control.zoom(options);
		compare = new Compare(zoom, props);
	});

	$effect(() => {
		if (map) {
			if (zoom) {
				const props = {
					options
				};
				compare?.updateProps(props);
				map.addControl(zoom);
				compare?.storeProps(props);
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
