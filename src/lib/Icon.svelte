<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Icon, Util } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from './context.ts';
	import type { IconOptions } from 'leaflet';

	export let options: IconOptions = { iconUrl: '' };
	export let instance: Icon | undefined = undefined;

	let mapStore = useConsumeMap();
	let markerStore = useConsumeMarker();

	let icon: Icon | undefined;

	$: if ($mapStore && $markerStore) {
		if (!icon) {
			icon = new Icon(options);
		}
		Util.setOptions(icon, options);
		$markerStore.setIcon(icon);
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
