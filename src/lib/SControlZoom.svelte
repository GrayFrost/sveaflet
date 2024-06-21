<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	// props
	export let options: Control.ZoomOptions = {};
	export let instance: Control.Zoom | undefined = undefined;

	// store
	let mapStore = useConsumeMap();

	// data
	let zoom: Control.Zoom | undefined;
	let preOptions = options;

	onMount(() => {
		zoom = control.zoom(options);
		storeProps();
	});

	$: if ($mapStore) {
		if (zoom) {
			updatePosition(zoom, preOptions, options);
			zoom.addTo($mapStore);
			storeProps();
		}
	}

	$: instance = zoom;

	function updatePosition(
		obj: Control.Zoom,
		preOpt: Control.ZoomOptions,
		opt: Control.ZoomOptions
	) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function storeProps() {
		preOptions = Object.create(options);
	}

	function reset() {
		zoom?.remove();
		zoom = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
