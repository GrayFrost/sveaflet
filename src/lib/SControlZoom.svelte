<script lang="ts">
	import { onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	export let options: Control.ZoomOptions = {};
	export let instance: Control.Zoom | undefined = undefined;

	let mapStore = useConsumeMap();

	let zoom: Control.Zoom | undefined;

	$: if ($mapStore) {
		reset();
		zoom = control.zoom(options);
		zoom.addTo($mapStore);
	}

	$: instance = zoom;

	function reset() {
		zoom?.remove();
		zoom = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
