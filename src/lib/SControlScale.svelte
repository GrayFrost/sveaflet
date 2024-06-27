<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';

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
	let preOptions = options;

	onMount(() => {
		scale = control.scale(options);
		storeProps({ options });
	});

	$: if (map) {
		if (scale) {
			updatePosition(scale, preOptions, options);
			map.addControl(scale);
			storeProps({ options });
		}
	}

	function updatePosition(
		obj: Control.Scale,
		preOpt: Control.ScaleOptions,
		opt: Control.ScaleOptions
	) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function storeProps(props: { options: Control.ScaleOptions }) {
		const { options } = props;
		preOptions = Object.create(options);
	}

	function reset() {
		scale?.remove();
		scale = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
