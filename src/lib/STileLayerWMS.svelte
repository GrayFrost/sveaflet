<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { TileLayer } from 'leaflet';
	import type { WMSOptions } from 'leaflet';
	import { useConsumeMap, useConsumeControlLayer } from '$lib/context';

	// props
	export let baseUrl: string;
	export let options: WMSOptions = {};
	export let layerName: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let controlLayerStore = useConsumeControlLayer();

	// data
	let tileLayerWMS: TileLayer | undefined;
	let preBaseUrl = baseUrl;
	let preOptions = options;

	onMount(() => {
		tileLayerWMS = new TileLayer.WMS(baseUrl, options);
		storeProps({
			baseUrl,
			options
		});
	});

	$: if ($mapStore) {
		if (tileLayerWMS) {
			updateUrl(tileLayerWMS, preBaseUrl, baseUrl);
			updateOpacity(tileLayerWMS, preOptions, options);
			updateZIndex(tileLayerWMS, preOptions, options);

			if ($controlLayerStore) {
				if (!layerName) {
					console.warn('Layer Name is required in ControlLayers');
				}

				if (checked) {
					$mapStore.addLayer(tileLayerWMS);
				}
				$controlLayerStore.addBaseLayer(tileLayerWMS, layerName || 'Layer Name');
				$controlLayerStore.addTo($mapStore);
			} else {
				tileLayerWMS.addTo($mapStore);
			}

			storeProps({
				baseUrl,
				options
			});
		}
	}

	$: instance = tileLayerWMS;

	function updateUrl(obj: TileLayer, preBaseUrl: string, baseUrl: string) {
		if (baseUrl !== preBaseUrl && baseUrl !== undefined) {
			obj.setUrl(baseUrl);
		}
	}

	function updateOpacity(obj: TileLayer, preOpt: WMSOptions, opt: WMSOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function updateZIndex(obj: TileLayer, preOpt: WMSOptions, opt: WMSOptions) {
		if (opt.zIndex !== preOpt.zIndex && opt.zIndex !== undefined) {
			obj.setOpacity(opt.zIndex);
		}
	}

	function storeProps(props: { baseUrl: string; options: WMSOptions }) {
		const { baseUrl, options } = props;
		preBaseUrl = baseUrl;
		preOptions = Object.create(options);
	}

	function reset() {
		tileLayerWMS?.remove();
		tileLayerWMS = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
