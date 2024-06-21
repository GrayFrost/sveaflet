<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	// props
	export let options: Control.ScaleOptions = {};
	export let instance: Control.Scale | undefined = undefined;

	// store
	let mapStore = useConsumeMap();

	// data
	let scale: Control.Scale | undefined;
	let preOptions = options;

	onMount(() => {
		scale = control.scale(options);
		storeProps({ options });
	});

	$: if ($mapStore) {
		if (scale) {
			updatePosition(scale, preOptions, options);
			scale.addTo($mapStore);
			storeProps({ options });
		}
	}

	$: instance = scale;

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
