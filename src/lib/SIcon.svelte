<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Icon } from 'leaflet';
	import type { IconOptions } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from '$lib/context';

	// props
	export let options: IconOptions = { iconUrl: '' };
	export let instance: Icon | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let markerStore = useConsumeMarker();

	// data
	let icon: Icon | undefined;

	onMount(() => {
		icon = new Icon(options);
	});

	$: if ($mapStore) {
		if (icon) {
			if ($markerStore) {
				$markerStore.setIcon(icon);
			} else {
				console.warn('Icon should bind Marker.');
			}
		}
	}

	$: instance = icon;

	function reset() {
		icon?.remove?.();
		icon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
