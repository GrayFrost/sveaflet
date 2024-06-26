<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, control } from 'leaflet';
	import type { Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: Control.ZoomOptions = {};
	export let instance: Control.Zoom | undefined = undefined;

	// store
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let zoom: Control.Zoom | undefined;
	let preOptions = options;

	$: map = getMap?.();

	onMount(() => {
		zoom = control.zoom(options);
		storeProps({ options });
	});

	$: if (map) {
		if (zoom) {
			updatePosition(zoom, preOptions, options);
			map.addControl(zoom);
			storeProps({ options });
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

	function storeProps(props: { options: Control.ZoomOptions }) {
		const { options } = props;
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
