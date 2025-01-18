<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { WMSOptions, Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer, Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		url: string;
		options?: WMSOptions;
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
	let tileLayerWMS: TileLayer | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<TileLayer> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let controlLayers: Control.Layers | undefined = $derived(getControl?.());

	$effect(() => {
		instance = tileLayerWMS;
	});

	onMount(() => {
		tileLayerWMS = new TileLayer.WMS(url, options);
		eventBridge = new EventBridge(tileLayerWMS);
		eventBridge.addEvents(restProps);
		compare = new Compare(tileLayerWMS, latestProps);
	});

	$effect(() => {
		if (map) {
			if (tileLayerWMS) {
				compare?.updateProps(latestProps);

				if (controlLayers) {
					if (!name) {
						console.warn('Name is required in ControlLayers');
					} else {
						setControlLayer({
							layer: tileLayerWMS,
							name,
							controlLayers,
							layerType,
							map,
							checked
						});
					}

					controlLayers.addTo(map);
				} else {
					map.addLayer(tileLayerWMS);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		tileLayerWMS?.remove();
		tileLayerWMS = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
