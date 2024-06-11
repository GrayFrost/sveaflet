<script lang="ts">
	import { onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: Control.ZoomOptions = {};

	let { map: mapStore } = useConsumeMap();
	let zoom: Control.Zoom | undefined;

	if ($mapStore) {
		zoom = control.zoom(options);
		zoom.addTo($mapStore);
	}

	onDestroy(() => {
		zoom?.remove();
		zoom = undefined;
	})
</script>
