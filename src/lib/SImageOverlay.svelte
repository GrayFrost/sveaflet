<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, ImageOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let url: string;
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: ImageOverlay | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let imageOverlay: ImageOverlay | undefined;
	let preUrl = url;
	let preBounds = bounds;
	let preOptions = options;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = imageOverlay;

	onMount(() => {
		imageOverlay = new ImageOverlay(url, bounds, options);
		storeProps({
			url,
			bounds,
			options
		});
	});

	$: if (map) {
		if (imageOverlay) {
			updateUrl(imageOverlay, preUrl, url);
			updateBounds(imageOverlay, preBounds, bounds);
			updateZIndex(imageOverlay, preOptions, options);
			updateOpacity(imageOverlay, preOptions, options);

			if (layer) {
				layer.addLayer(imageOverlay);
			} else {
				map.addLayer(imageOverlay);
			}
			storeProps({
				url,
				bounds,
				options
			});
		}
	}

	function updateUrl(obj: ImageOverlay, preUrl: string, url: string) {
		if (url !== preUrl && url !== undefined) {
			obj.setUrl(url);
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
		url: string;
		bounds: LatLngBounds;
		options: ImageOverlayOptions;
	}) {
		const { url, bounds, options } = props;
		preUrl = url;
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

	setContext(Map, { ...parentContext, getOverlay: () => imageOverlay });
</script>
