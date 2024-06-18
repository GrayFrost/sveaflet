<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ImageOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	export let imageUrl: string;
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: ImageOverlay | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	let imageOverlay: ImageOverlay | undefined;

	$: if ($mapStore) {
		if (!imageOverlay) {
			imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		}

		imageUrl && imageOverlay.setUrl(imageUrl);
		imageOverlay.setBounds(bounds);

		if ($layerGroupStore) {
			$layerGroupStore.addLayer(imageOverlay);
		} else {
			imageOverlay.addTo($mapStore);
		}
	}

	$: instance = imageOverlay;

	onDestroy(() => {
		imageOverlay?.remove();
		imageOverlay = undefined;
	});
</script>
