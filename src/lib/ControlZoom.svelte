<script lang="ts">
	import { onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: Control.ZoomOptions = {};
	export let instance: Control.Zoom | undefined = undefined;

	let mapStore = useConsumeMap();
	
	let zoom: Control.Zoom | undefined;

	$: if ($mapStore) {
		zoom = control.zoom(options);
		zoom.addTo($mapStore);
	}

	$: instance = zoom;

	onDestroy(() => {
		zoom?.remove();
		zoom = undefined;
	});
</script>
