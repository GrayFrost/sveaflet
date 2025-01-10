<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
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

	let { options = {}, instance = $bindable() }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let scale: Control.Scale | undefined = $state();
	let map: Map | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
	});

	$effect(() => {
		instance = scale;
	});

	onMount(() => {
		const props = {
			options
		};
		scale = control.scale(options);
		compare = new Compare(scale, props);
	});

	$effect(() => {
		if (map) {
			if (scale) {
				const props = {
					options
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
