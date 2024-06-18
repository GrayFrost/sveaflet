<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ImageOverlay } from 'leaflet';
	import { useConsumeMap } from '$lib/context';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	export let imageUrl: string;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};
	export let instance: ImageOverlay | undefined = undefined;

	let mapStore = useConsumeMap();

	let imageOverlay: ImageOverlay | undefined;

	$: if ($mapStore) {
		if (!imageOverlay) {
			imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		}
		imageOverlay.addTo($mapStore);
	}

	$: instance = imageOverlay;

	onDestroy(() => {
		imageOverlay?.remove();
		imageOverlay = undefined;
	});
</script>
