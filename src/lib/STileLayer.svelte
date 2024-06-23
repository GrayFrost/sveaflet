<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import { useConsumeMap, useConsumeControlLayer } from '$lib/context';

	// props
	export let urlTemplate: string;
	export let options: TileLayerOptions = {};
	export let layerName: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let controlLayerStore = useConsumeControlLayer();

	// data
	let tileLayer: TileLayer | undefined;
	let preUrlTemplate = urlTemplate;
	let preOptions = options;

	onMount(() => {
		tileLayer = new TileLayer(urlTemplate, options);
		storeProps({
			urlTemplate,
			options
		});
	});

	$: if ($mapStore) {
		if (tileLayer) {
			// TODO: how to update all options?
			updateUrl(tileLayer, preUrlTemplate, urlTemplate);
			updateOpacity(tileLayer, preOptions, options);
			updateZIndex(tileLayer, preOptions, options);
			if (urlTemplate !== preUrlTemplate && urlTemplate !== undefined) {
				tileLayer.setUrl(urlTemplate);
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

			storeProps({
				urlTemplate,
				options
			});
		}
	}

	$: instance = tileLayer;

	function updateUrl(obj: TileLayer, preBaseUrl: string, baseUrl: string) {
		if (baseUrl !== preBaseUrl && baseUrl !== undefined) {
			obj.setUrl(baseUrl);
		}
	}

	function updateOpacity(obj: TileLayer, preOpt: TileLayerOptions, opt: TileLayerOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function updateZIndex(obj: TileLayer, preOpt: TileLayerOptions, opt: TileLayerOptions) {
		if (opt.zIndex !== preOpt.zIndex && opt.zIndex !== undefined) {
			obj.setZIndex(opt.zIndex);
		}
	}

	function storeProps(props: { urlTemplate: string; options: TileLayerOptions }) {
		const { urlTemplate, options } = props;
		preUrlTemplate = urlTemplate;
		preOptions = Object.create(options);
	}

	function reset() {
		tileLayer?.remove();
		tileLayer = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
