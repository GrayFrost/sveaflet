<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Map, ImageOverlay } from 'leaflet';
	import type { LatLngBounds, ImageOverlayOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	interface Props {
		url: string;
		bounds: LatLngBounds;
		options?: ImageOverlayOptions;
		instance?: ImageOverlay;
	}

	let { url, bounds, options = {}, instance = $bindable(), ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let imageOverlay: ImageOverlay | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	$effect(() => {
		instance = imageOverlay;
	});

	onMount(() => {
		const props = {
			url,
			bounds,
			options,
			...restProps
		};
		imageOverlay = new ImageOverlay(url, bounds, options);
		compare = new Compare(imageOverlay, props);
	});

	$effect(() => {
		if (map) {
			if (imageOverlay) {
				const props = {
					url,
					bounds,
					options,
					...restProps
				};
				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(imageOverlay);
				} else {
					map.addLayer(imageOverlay);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
		imageOverlay?.remove();
		imageOverlay = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => imageOverlay });
</script>
