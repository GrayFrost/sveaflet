<script lang="ts">
	import { onDestroy } from 'svelte';
	import { control } from 'leaflet';
	import type { Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: Control.ScaleOptions = {};

	let { map: mapStore } = useConsumeMap();
	let scale: Control.Scale | undefined;

	$: if ($mapStore) {
		scale = control.scale(options);
		scale.addTo($mapStore);
	}

	onDestroy(() => {
		scale?.remove();
		scale = undefined;
	})
</script>
