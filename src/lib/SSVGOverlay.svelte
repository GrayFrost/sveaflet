<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions, SVGOverlayStyleOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup } from '$lib/context';

	// props
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: SVGOverlay | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();

	// data
	let svgOverlay: SVGOverlay | undefined;
	let svgElement: SVGElement | undefined;
	let preBounds = bounds;
	let preOptions = options;

	onMount(() => {
		if (svgElement) {
			svgOverlay = new SVGOverlay(svgElement, bounds, options);
		} else {
			console.warn('SVG Element Required!');
		}
		preOptions = Object.create(options);
		storeProps({
			bounds,
			options
		});
	});

	$: if ($mapStore) {
		if (svgOverlay) {
			// TODO: how to update all options?
			updateBounds(svgOverlay, preBounds, bounds);
			updateOpacity(svgOverlay, preOptions, options);
			updateZIndex(svgOverlay, preOptions, options);
			if (options.zIndex !== preOptions.zIndex && options.zIndex !== undefined) {
				svgOverlay.setZIndex(options.zIndex);
			}

			if ($layerGroupStore) {
				$layerGroupStore.addLayer(svgOverlay);
			} else {
				svgOverlay.addTo($mapStore);
			}

			storeProps({
				bounds,
				options
			});
		}
	}

	$: instance = svgOverlay;

	function updateBounds(obj: SVGOverlay, preBounds: LatLngBounds, bounds: LatLngBounds) {
		if (bounds !== preBounds && bounds !== undefined) {
			obj.setBounds(bounds);
		}
	}

	function updateOpacity(
		obj: SVGOverlay,
		preOpt: SVGOverlayStyleOptions,
		opt: SVGOverlayStyleOptions
	) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function updateZIndex(
		obj: SVGOverlay,
		preOpt: SVGOverlayStyleOptions,
		opt: SVGOverlayStyleOptions
	) {
		if (opt.zIndex !== preOpt.zIndex && opt.zIndex !== undefined) {
			obj.setZIndex(opt.zIndex);
		}
	}

	function storeProps(props: { bounds: LatLngBounds; options: ImageOverlayOptions }) {
		const { bounds, options } = props;
		preBounds = bounds;
		preOptions = Object.create(options);
	}

	function reset() {
		svgOverlay?.remove();
		svgOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

<svg bind:this={svgElement} xmlns="http://www.w3.org/2000/svg" {...$$restProps}>
	<slot />
</svg>
