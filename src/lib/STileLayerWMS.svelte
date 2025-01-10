<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { WMSOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer, Compare } from './utils/index';

	// props
	export let url: string;
	export let options: WMSOptions = {};
	export let name: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;
	export let layerType: 'base' | 'overlay' | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let tileLayerWMS: TileLayer | undefined;
	let compare: Compare;

	$: map = getMap?.();
	$: controlLayers = getControl?.();
	$: instance = tileLayerWMS;

	onMount(() => {
		tileLayerWMS = new TileLayer.WMS(url, options);
		compare = new Compare(tileLayerWMS, $$props);
	});

	$: if (map) {
		if (tileLayerWMS) {
			compare.updateProps($$props);

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

			compare.storeProps($$props);
		}
	}

	function reset() {
		tileLayerWMS?.remove();
		tileLayerWMS = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
