<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils';

	// props
	export let options: Control.ScaleOptions = {};
	export let instance: Control.Scale | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	$: map = getMap?.();
	$: instance = scale;

	// data
	let scale: Control.Scale | undefined;
	let compare: Compare;

	onMount(() => {
		scale = control.scale(options);
		compare = new Compare(scale, $$props)
	});

	$: if (map) {
		if (scale) {
			compare.updateProps($$props);
			map.addControl(scale);
			compare.storeProps($$props);
		}
	}

	function reset() {
		scale?.remove();
		scale = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
