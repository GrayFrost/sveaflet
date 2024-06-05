<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';
	import { type MapOptions, Map } from 'leaflet?client';
	import 'leaflet/dist/leaflet.css';

	import { useProvideMap } from './context.ts';

	let mapStore = writable<Map | undefined>();
	let mapContainer: HTMLElement;
	let dispatch = createEventDispatcher();

	export let options: MapOptions = {};

	useProvideMap(mapStore);

	onMount(() => {
		$mapStore = new Map(mapContainer, options);

		$mapStore.on('click',(e) => {
			dispatch('click', e);
		})
	});

	onDestroy(() => {
		$mapStore?.remove();
		$mapStore = undefined;
	});
</script>

<div class="w-full h-full" bind:this={mapContainer}>
	{#if $mapStore}
		<slot />
	{/if}
</div>

