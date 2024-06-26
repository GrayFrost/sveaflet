<script lang="ts">
	import { onDestroy, onMount, setContext, getContext } from 'svelte';
	import { Map, SVGOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions, SVGOverlayStyleOptions } from 'leaflet';

	// props
	export let bounds: LatLngBounds;
	export let options: ImageOverlayOptions = {};
	export let instance: SVGOverlay | undefined = undefined;

	// store

	let parentContext: any = getContext(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let svgOverlay: SVGOverlay | undefined;
	let svgElement: SVGElement | undefined;
	let preBounds = bounds;
	let preOptions = options;

	$: map = getMap?.();
	$: layer = getLayer?.();

	let ready = false;

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
		ready = true;
	});

	$: if (map) {
		if (svgOverlay) {
			// TODO: how to update all options?
			updateBounds(svgOverlay, preBounds, bounds);
			updateOpacity(svgOverlay, preOptions, options);
			updateZIndex(svgOverlay, preOptions, options);
			if (options.zIndex !== preOptions.zIndex && options.zIndex !== undefined) {
				svgOverlay.setZIndex(options.zIndex);
			}

			if (layer) {
				layer.addLayer(svgOverlay);
			} else {
				map.addLayer(svgOverlay);
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

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => svgOverlay }));
</script>

<svg bind:this={svgElement} xmlns="http://www.w3.org/2000/svg" {...$$restProps}>
	{#if ready}
		<slot />
	{/if}
</svg>
