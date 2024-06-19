<script lang="ts">
	import { onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	export let options: Control.AttributionOptions = {};
	export let instance: Control.Attribution | undefined = undefined;

	let mapStore = useConsumeMap();

	let attribution: Control.Attribution | undefined;

	$: if ($mapStore) {
		if (!attribution) {
			attribution = control.attribution(options);
		} else {
			reset();
			attribution = control.attribution(options);
		}
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
