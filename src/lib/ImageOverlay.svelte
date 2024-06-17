<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ImageOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	let mapStore = useConsumeMap();

	export let imageUrl: string;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};

	let imageOverlay: ImageOverlay | undefined;

	$: if ($mapStore) {
		imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		imageOverlay.addTo($mapStore);
	}

	onDestroy(() => {
		imageOverlay?.remove();
		imageOverlay = undefined;
	})
</script>
