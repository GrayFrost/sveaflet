<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { Control } from 'leaflet';
	import { control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: Control.AttributionOptions = {};
	
	let { map: mapStore } = useConsumeMap();
	let attribution: Control.Attribution | undefined;

	$: if ($mapStore) {
		attribution = control.attribution(options);
		attribution.addTo($mapStore);
	}

	onDestroy(() => {
		attribution?.remove();
		attribution = undefined;
	})
</script>
