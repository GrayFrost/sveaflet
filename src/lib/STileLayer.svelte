<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer, Compare } from './utils/index';

	// props
	export let url: string;
	export let options: TileLayerOptions = {};
	export let name: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;
	export let layerType: 'base' | 'overlay' | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let tileLayer: TileLayer | undefined;
	let compare: Compare;

	$: map = getMap?.();
	$: controlLayers = getControl?.();
	$: instance = tileLayer;

	onMount(() => {
		tileLayer = new TileLayer(url, options);
		compare = new Compare(tileLayer, $$props);
	});

	$: if (map) {
		if (tileLayer) {
			compare.updateProps($$props);

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

			compare.storeProps($$props);
		}
	}

	function reset() {
		tileLayer?.remove();
		tileLayer = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
