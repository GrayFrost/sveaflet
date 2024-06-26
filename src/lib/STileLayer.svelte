<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let urlTemplate: string;
	export let options: TileLayerOptions = {};
	export let name: string = '';
	export let checked: boolean = false;
	export let instance: TileLayer | undefined = undefined;
	export let layerType: 'base' | 'overlay' | undefined = undefined;
	// store
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	$: map = getMap?.();
	$: controlLayers = getControl?.();

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

	$: if (map) {
		if (tileLayer) {
			// TODO: how to update all options?
			updateUrl(tileLayer, preUrlTemplate, urlTemplate);
			updateOpacity(tileLayer, preOptions, options);
			updateZIndex(tileLayer, preOptions, options);
			if (urlTemplate !== preUrlTemplate && urlTemplate !== undefined) {
				tileLayer.setUrl(urlTemplate);
			}

			if (controlLayers) {
				if (!name) {
					console.warn('Name is required in ControlLayers');
				} else {
					if (layerType === 'base') {
						if (checked) {
							map.addLayer(tileLayer);
							controlLayers.addBaseLayer(tileLayer, name);
						} else {
							controlLayers.addBaseLayer(tileLayer, name);
						}
					} else if (layerType === 'overlay') {
						if (checked) {
							map.addLayer(tileLayer);
						} else {
							controlLayers.addOverlay(tileLayer, name);
						}
					}
				}

				controlLayers.addTo(map);
			} else {
				map.addLayer(tileLayer);
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
