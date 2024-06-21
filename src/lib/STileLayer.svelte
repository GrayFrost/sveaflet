<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import { useConsumeMap, useConsumeControlLayer } from '$lib/context';

	export let urlTemplate: string;
	export let options: TileLayerOptions = {};
	export let layerName: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;

	let mapStore = useConsumeMap();
	let controlLayerStore = useConsumeControlLayer();

	let tileLayer: TileLayer | undefined;

	let preUrlTemplate = urlTemplate;
	let preOptions = options;

	onMount(() => {
		tileLayer = new TileLayer(urlTemplate, options);
		storeProps();
	});

	$: if ($mapStore) {
		if (tileLayer) {
			// TODO: how to update all options?
			if (urlTemplate !== preUrlTemplate && urlTemplate !== undefined) {
				tileLayer.setUrl(urlTemplate);
			}
			if (options.zIndex !== preOptions.zIndex && options.zIndex !== undefined) {
				tileLayer.setZIndex(options.zIndex);
			}

			if (options.opacity !== preOptions.opacity && options.opacity !== undefined) {
				tileLayer.setOpacity(options.opacity);
			}

			if ($controlLayerStore) {
				if (!layerName) {
					console.warn('Layer Name is required in ControlLayers');
				}

				if (checked) {
					$mapStore.addLayer(tileLayer);
				}

				$controlLayerStore.addBaseLayer(tileLayer, layerName || 'Layer Name');
				$controlLayerStore.addTo($mapStore);
			} else {
				tileLayer.addTo($mapStore);
			}

			storeProps();
		}
	}

	$: instance = tileLayer;

	function storeProps() {
		preUrlTemplate = urlTemplate;
		preOptions = Object.create(options);
	}

	function reset() {
		tileLayer?.remove();
		tileLayer = undefined;
		// todo other props
	}

	onDestroy(() => {
		reset();
	});
</script>
