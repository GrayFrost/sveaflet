<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, ImageOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let imageUrl: string;
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: ImageOverlay | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let imageOverlay: ImageOverlay | undefined;
	let preImageUrl = imageUrl;
	let preBounds = bounds;
	let preOptions = options;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = imageOverlay;

	onMount(() => {
		imageOverlay = new ImageOverlay(imageUrl, bounds, options);
		storeProps({
			imageUrl,
			bounds,
			options
		});
	});

	$: if (map) {
		if (imageOverlay) {
			updateUrl(imageOverlay, preImageUrl, imageUrl);
			updateBounds(imageOverlay, preBounds, bounds);
			updateZIndex(imageOverlay, preOptions, options);
			updateOpacity(imageOverlay, preOptions, options);

			if (layer) {
				layer.addLayer(imageOverlay);
			} else {
				map.addLayer(imageOverlay);
			}
			storeProps({
				imageUrl,
				bounds,
				options
			});
		}
	}

	function updateUrl(obj: ImageOverlay, preImageUrl: string, imageUrl: string) {
		if (imageUrl !== preImageUrl && imageUrl !== undefined) {
			obj.setUrl(imageUrl);
		}
	}

	function updateBounds(obj: ImageOverlay, preBounds: LatLngBounds, bounds: LatLngBounds) {
		if (bounds !== preBounds && bounds !== undefined) {
			obj.setBounds(bounds);
		}
	}

	function updateZIndex(obj: ImageOverlay, preOpt: ImageOverlayOptions, opt: ImageOverlayOptions) {
		if (opt.zIndex !== preOpt.zIndex && opt.zIndex !== undefined) {
			obj.setZIndex(opt.zIndex);
		}
	}

	function updateOpacity(obj: ImageOverlay, preOpt: ImageOverlayOptions, opt: ImageOverlayOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function storeProps(props: {
		imageUrl: string;
		bounds: LatLngBounds;
		options: ImageOverlayOptions;
	}) {
		const { imageUrl, bounds, options } = props;
		preImageUrl = imageUrl;
		preBounds = bounds;
		preOptions = options;
	}

	function reset() {
		imageOverlay?.remove();
		imageOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => imageOverlay }));
</script>
