<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Control } from 'leaflet';
	import { control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: Control.AttributionOptions = {};
	export let instance: Control.Attribution | undefined = undefined;

	let mapStore = useConsumeMap();

	let attribution: Control.Attribution | undefined;

	$: if ($mapStore) {
		reset();
		attribution = control.attribution(options);
		attribution.addTo($mapStore);
	}

	$: instance = attribution;

	function reset() {
		attribution?.remove();
		attribution = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
