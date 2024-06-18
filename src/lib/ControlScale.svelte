<script lang="ts">
	import { onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: Control.ScaleOptions = {};
	export let instance: Control.Scale | undefined = undefined;

	let mapStore = useConsumeMap();

	let scale: Control.Scale | undefined;

	$: if ($mapStore) {
		reset();
		scale = control.scale(options);
		scale.addTo($mapStore);
	}

	$: instance = scale;

	function reset() {
		scale?.remove();
		scale = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
