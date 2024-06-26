<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { WMSOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let baseUrl: string;
	export let options: WMSOptions = {};
	export let name: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;
	export let layerType: 'base' | 'overlay' | undefined = undefined;
	// store
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

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

	$: map = getMap?.();
	$: controlLayers = getControl?.();

	$: if (map) {
		if (tileLayerWMS) {
			updateUrl(tileLayerWMS, preBaseUrl, baseUrl);
			updateOpacity(tileLayerWMS, preOptions, options);
			updateZIndex(tileLayerWMS, preOptions, options);

			if (controlLayers) {
				if (!name) {
					console.warn('Name is required in ControlLayers');
				} else {
					if (layerType === 'base') {
						if (checked) {
							map.addLayer(tileLayerWMS);
							controlLayers.addBaseLayer(tileLayerWMS, name);
						} else {
							controlLayers.addBaseLayer(tileLayerWMS, name);
						}
					} else if (layerType === 'overlay') {
						if (checked) {
							map.addLayer(tileLayerWMS);
						} else {
							controlLayers.addOverlay(tileLayerWMS, name);
						}
					}
				}

				controlLayers.addTo(map);
			} else {
				map.addLayer(tileLayerWMS);
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
