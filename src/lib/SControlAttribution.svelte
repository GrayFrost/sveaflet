<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	// props
	export let options: Control.AttributionOptions = {};
	export let instance: Control.Attribution | undefined = undefined;

	// store
	let mapStore = useConsumeMap();

	// data
	let attribution: Control.Attribution | undefined;
	let preOptions = options;

	onMount(() => {
		attribution = control.attribution(options);
		storeProps();
	});

	$: if ($mapStore) {
		if (attribution) {
			updatePrefix(attribution, preOptions, options);
			updatePosition(attribution, preOptions, options);
			attribution.addTo($mapStore);

			storeProps();
		}
	}

	$: instance = attribution;

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

	function storeProps() {
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
