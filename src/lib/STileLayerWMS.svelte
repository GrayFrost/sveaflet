<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { WMSOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer } from './utils';

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
	let preUrl = url;
	let preOptions = options;

	$: map = getMap?.();
	$: controlLayers = getControl?.();
	$: instance = tileLayerWMS;

	onMount(() => {
		tileLayerWMS = new TileLayer.WMS(url, options);
		storeProps({
			url,
			options
		});
	});

	$: if (map) {
		if (tileLayerWMS) {
			updateUrl(tileLayerWMS, preUrl, url);
			updateOpacity(tileLayerWMS, preOptions, options);
			updateZIndex(tileLayerWMS, preOptions, options);

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

			storeProps({
				url,
				options
			});
		}
	}

	function updateUrl(obj: TileLayer, preUrl: string, url: string) {
		if (url !== preUrl && url !== undefined) {
			obj.setUrl(url);
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

	function storeProps(props: { url: string; options: WMSOptions }) {
		const { url, options } = props;
		preUrl = url;
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
