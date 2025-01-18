<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { TileLayerOptions, Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer, Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		url: string;
		options?: TileLayerOptions;
		name?: string;
		checked?: boolean;
		instance?: TileLayer;
		layerType?: 'base' | 'overlay';
	} & { [key: string]: unknown };

	let {
		url,
		options = {},
		name = '',
		checked = false,
		instance = $bindable(),
		layerType,
		...restProps
	}: Props = $props();

	let latestProps = $derived.by(() => ({
		url,
		options,
		name,
		checked,
		layerType,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let tileLayer: TileLayer | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<TileLayer> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let controlLayers: Control.Layers | undefined = $derived(getControl?.());

	$effect(() => {
		instance = tileLayer;
	});

	onMount(() => {
		tileLayer = new TileLayer(url, options);
		eventBridge = new EventBridge(tileLayer);
		eventBridge.addEvents(restProps);
		compare = new Compare(tileLayer, latestProps);
	});

	$effect(() => {
		if (map) {
			if (tileLayer) {
				compare?.updateProps(latestProps);

				if (controlLayers) {
					if (!name) {
						console.warn('Name is required in ControlLayers');
					} else {
						setControlLayer({
							layer: tileLayer,
							name,
							controlLayers,
							layerType,
							map,
							checked
						});
					}

					controlLayers.addTo(map);
				} else {
					map.addLayer(tileLayer);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		tileLayer?.remove();
		tileLayer = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
