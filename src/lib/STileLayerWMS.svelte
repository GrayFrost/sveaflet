<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { WMSOptions, Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer, Compare } from './utils/index';

	// props
	type Props = {
		url: string;
		options: WMSOptions;
		name: string;
		checked: boolean;
		instance: TileLayer | undefined;
		layerType: 'base' | 'overlay' | undefined;
	};

	let {
		url,
		options = {},
		name = '',
		checked = false,
		instance = $bindable(),
		layerType
	}: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let tileLayerWMS: TileLayer | undefined = $state();
	let map: Map | undefined = $state();
	let controlLayers: Control.Layers | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
		controlLayers = getControl?.();
	});

	$effect(() => {
		instance = tileLayerWMS;
	});

	onMount(() => {
		const props = {
			url,
			options,
			name,
			checked,
			layerType
		};
		tileLayerWMS = new TileLayer.WMS(url, options);
		compare = new Compare(tileLayerWMS, props);
	});

	$effect(() => {
		if (map) {
			if (tileLayerWMS) {
				const props = {
					url,
					options,
					name,
					checked,
					layerType
				};
				compare?.updateProps(props);

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

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
		tileLayerWMS?.remove();
		tileLayerWMS = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
