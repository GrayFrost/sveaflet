<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions, Layer } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from './context.ts';

	let { map: mapStore } = useConsumeMap();
	let layerStore = useConsumeLayer();

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {}; // todo 有两种类型

	let popup: Popup | undefined;

	$: if ($mapStore) {
		if (latlng) {
			popup = new Popup(latlng, options);
		} else {
			popup = new Popup(options);
		}

		if (!$layerStore) {
			popup?.openOn($mapStore); // todo open
		} else {
			let popupContent = popup?.options.content || '';
			$layerStore.bindPopup(popupContent).openPopup(); // todo open
		}
	}

	onDestroy(() => {
		popup?.remove();
		popup = undefined;
	})
</script>

<slot />
