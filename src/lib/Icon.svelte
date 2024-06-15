<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Icon } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from './context.ts';
	import type { IconOptions } from 'leaflet';

	delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

	let { map: mapStore } = useConsumeMap();
	let markerStore = useConsumeMarker();

	export let options: IconOptions = { iconUrl: '' };

	let icon: Icon | undefined;

	if ($mapStore && $markerStore) {
		icon = new Icon(options);
		$markerStore.setIcon(icon);
	}

	onDestroy(() => {
		icon?.remove?.();
		icon = undefined;
	})
</script>
