<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { type LatLngExpression, type PopupOptions, type Layer, Popup } from 'leaflet';
	import { useConsumeMarker, useConsumeMap } from './context.ts';

	let mapStore = useConsumeMap();
	let markerStore = useConsumeMarker();

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {}; // todo 有两种类型
	export let source: Layer | undefined = undefined;

	let popup: Popup | undefined;
	if ($mapStore) {
		if (latlng) {
			popup = new Popup(latlng, options);
		} else {
			popup = new Popup(options, source);
		}
	}

	if (!$markerStore && $mapStore) {
		popup?.openOn($mapStore);
	} else if ($markerStore) {
		let popupContent = popup?.options.content || '';
		$markerStore.bindPopup(popupContent).openPopup();
	}
</script>

<slot />
