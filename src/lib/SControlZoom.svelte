<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let options: Control.ZoomOptions = {};
	export let instance: Control.Zoom | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let zoom: Control.Zoom | undefined;
	let compare: Compare;

	$: map = getMap?.();
	$: instance = zoom;

	onMount(() => {
		zoom = control.zoom(options);
		compare = new Compare(zoom, $$props);
	});

	$: if (map) {
		if (zoom) {
			compare.updateProps($$props);
			map.addControl(zoom);
			compare.storeProps($$props);
		}
	}

	function reset() {
		zoom?.remove();
		zoom = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
