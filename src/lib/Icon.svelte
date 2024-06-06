<script lang="ts">
	import { useConsumeMap, useConsumeMarker } from './context.ts';
	import { Icon, type DefaultIconOptions } from 'leaflet?client';

	let { map: mapStore } = useConsumeMap();
  let markerStore = useConsumeMarker();

	export let options: DefaultIconOptions = {};

	if ($mapStore && $markerStore) {
		let icon = new Icon(options);
		$markerStore.setIcon(icon);
	}
</script>