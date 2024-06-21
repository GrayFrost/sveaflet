<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap, useProvideControlLayer } from '$lib/context';

	// props
	export let options: Control.LayersOptions = {};
	export let instance: Control.Layers | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layersStore = writable<Control.Layers | undefined>();

	// data
	let preOptions = options;

	onMount(() => {
		$layersStore = control.layers(undefined, undefined, options);
		storeProps({
			options
		});
	});

	$: if ($mapStore) {
		if ($layersStore) {
			updatePosition($layersStore, preOptions, options);
			$layersStore.addTo($mapStore);
			storeProps({
				options
			});
		}
	}

	$: instance = $layersStore;

	function updatePosition(
		obj: Control.Layers,
		preOpt: Control.LayersOptions,
		opt: Control.LayersOptions
	) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function storeProps(props: { options: Control.LayersOptions }) {
		const { options } = props;
		preOptions = Object.create(options);
	}

	function reset() {
		$layersStore?.remove();
		$layersStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideControlLayer(layersStore);
</script>

<slot />
