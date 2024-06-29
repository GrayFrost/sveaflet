<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Map, Marker, Icon } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {
		icon: new Icon.Default()
	};
	export let instance: Marker | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let marker: Marker | undefined;
	let preLatLng = latlng;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = marker;

	onMount(() => {
		marker = new Marker(latlng, options);
		storeProps({
			latlng,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (marker) {
			updateLatLng(marker, preLatLng, latlng);
			updateZIndexOffset(marker, preOptions, options);
			updateOpacity(marker, preOptions, options);
			if (layer) {
				layer.addLayer(marker);
			} else {
				map.addLayer(marker);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

	function updateLatLng(obj: Marker, preLatLng: LatLngExpression, latlng: LatLngExpression) {
		if (latlng !== preLatLng && latlng !== undefined) {
			obj.setLatLng(latlng);
		}
	}

	function updateZIndexOffset(obj: Marker, preOpt: MarkerOptions, opt: MarkerOptions) {
		if (opt.zIndexOffset !== preOpt.zIndexOffset && opt.zIndexOffset !== undefined) {
			obj.setZIndexOffset(opt.zIndexOffset);
		}
	}

	function updateOpacity(obj: Marker, preOpt: MarkerOptions, opt: MarkerOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function storeProps(props: { latlng: LatLngExpression; options: MarkerOptions }) {
		const { latlng, options } = props;
		preLatLng = latlng;
		preOptions = Object.create(options);
	}

	function reset() {
		marker?.remove();
		marker = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => marker });
</script>

{#if ready}
	<slot />
{/if}
