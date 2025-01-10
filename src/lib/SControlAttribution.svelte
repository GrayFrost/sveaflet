<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let options: Control.AttributionOptions = {};
	export let instance: Control.Attribution | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let attribution: Control.Attribution | undefined;
	let compare: Compare;

	$: map = getMap?.();
	$: instance = attribution;

	onMount(() => {
		attribution = control.attribution(options);
		compare = new Compare(attribution, $$props);
	});

	$: if (map) {
		if (attribution) {
			compare.updateProps($$props);
			map.addControl(attribution);
			compare.storeProps($$props);
		}
	}

	function reset() {
		attribution?.remove();
		attribution = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
