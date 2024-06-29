<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, TileLayer } from 'leaflet';
	import type { TileLayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer } from './utils';

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
	let preUrl = url;
	let preOptions = options;

	$: map = getMap?.();
	$: controlLayers = getControl?.();
	$: instance = tileLayer;

	onMount(() => {
		tileLayer = new TileLayer(url, options);
		storeProps({
			url,
			options
		});
	});

	$: if (map) {
		if (tileLayer) {
			// TODO: how to update all options?
			updateUrl(tileLayer, preUrl, url);
			updateOpacity(tileLayer, preOptions, options);
			updateZIndex(tileLayer, preOptions, options);

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

	function storeProps(props: { url: string; options: TileLayerOptions }) {
		const { url, options } = props;
		preUrl = url;
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
