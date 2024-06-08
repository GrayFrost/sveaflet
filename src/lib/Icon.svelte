<script lang="ts">
	import { Icon } from 'leaflet';
	import { useConsumeMap, useConsumeMarker } from './context.ts';
	import type { IconOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();
	let markerStore = useConsumeMarker();

	export let options: IconOptions = { iconUrl: '' };

	if ($mapStore && $markerStore) {
		let icon = new Icon(options);
		$markerStore.setIcon(icon);
	}
</script>
