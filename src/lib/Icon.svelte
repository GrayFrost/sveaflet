<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Icon } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from './context.ts';
	import type { IconOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();
	let markerStore = useConsumeMarker();

	export let options: IconOptions = { iconUrl: '' };

	let icon: Icon | undefined;

	if ($mapStore && $markerStore) {
		icon = new Icon(options);
		$markerStore.setIcon(icon);
	}

	onDestroy(() => {
		icon?.remove();
		icon = undefined;
	})
</script>
