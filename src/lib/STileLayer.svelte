<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { TileLayerOptions, Control } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer, Compare } from './utils/index';

	// props
	type Props = {
		url: string;
		options?: TileLayerOptions;
		name?: string;
		checked?: boolean;
		instance?: TileLayer;
		layerType?: 'base' | 'overlay';
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
	let tileLayer: TileLayer | undefined = $state();
	let map: Map | undefined = $state();
	let controlLayers: Control.Layers | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	$effect(() => {
		map = getMap?.();
		controlLayers = getControl?.();
	});

	$effect(() => {
		instance = tileLayer;
	});

	onMount(() => {
		const props = {
			url,
			options,
			name,
			checked,
			layerType
		};
		tileLayer = new TileLayer(url, options);
		compare = new Compare(tileLayer, props);
	});

	$effect(() => {
		if (map) {
			if (tileLayer) {
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

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
		tileLayer?.remove();
		tileLayer = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
