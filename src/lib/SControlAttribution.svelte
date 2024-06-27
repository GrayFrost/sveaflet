<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: Control.AttributionOptions = {};
	export let instance: Control.Attribution | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let attribution: Control.Attribution | undefined;
	let preOptions = options;

	$: map = getMap?.();
	$: instance = attribution;

	onMount(() => {
		attribution = control.attribution(options);
		storeProps({ options });
	});

	$: if (map) {
		if (attribution) {
			updatePrefix(attribution, preOptions, options);
			updatePosition(attribution, preOptions, options);
			map.addControl(attribution);

			storeProps({ options });
		}
	}

	function updatePosition(
		obj: Control.Attribution,
		preOpt: Control.AttributionOptions,
		opt: Control.AttributionOptions
	) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function updatePrefix(
		obj: Control.Attribution,
		preOpt: Control.AttributionOptions,
		opt: Control.AttributionOptions
	) {
		if (opt.prefix !== preOpt.prefix && opt.prefix !== undefined) {
			obj.setPrefix(opt.prefix as string | false);
		}
	}

	function storeProps(props: { options: Control.AttributionOptions }) {
		const { options } = props;
		preOptions = Object.create(options);
	}

	function reset() {
		attribution?.remove();
		attribution = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
