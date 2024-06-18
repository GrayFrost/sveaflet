<script lang="ts">
	import { onDestroy } from 'svelte';
	import { ImageOverlay } from 'leaflet';
	import { useConsumeMap } from './context.ts';
	import type { LatLngBoundsExpression, ImageOverlayOptions } from 'leaflet';

	export let imageUrl: string;
	export let bounds: LatLngBoundsExpression;
	export let options: ImageOverlayOptions = {};
	export let instance: ImageOverlay | undefined = undefined;

	let mapStore = useConsumeMap();

	let imageOverlay: ImageOverlay | undefined;

	$: if ($mapStore) {
		reset();
		imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		imageOverlay.addTo($mapStore);
	}

	$: instance = imageOverlay;

	function reset() {
		imageOverlay?.remove();
		imageOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
