<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Map, LayerGroup } from 'leaflet';
	import type { LayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: LayerOptions = {};
	export let overlayName: string = '';
	export let checked: boolean = false;
	export let instance: LayerGroup | undefined = undefined;

	// store
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;
	let layerGroup: LayerGroup | undefined;

	let ready = false;

	onMount(() => {
		layerGroup = new LayerGroup([], options);
		ready = true;
	});

	$: map = getMap?.();
	$: controlLayers = getControl?.();

	$: if (map) {
		if (layerGroup) {
			if (controlLayers) {
				if (!overlayName) {
					console.warn('Overlay Name is required in ControlLayers');
				}
				if (checked) {
					map.addLayer(layerGroup);
				}
				controlLayers.addOverlay(layerGroup, overlayName || 'Overlay Name');
				// map.addLayer(controlLayers);
				controlLayers.addTo(map);
			} else {
				map.addLayer(layerGroup);
			}
		}
	}

	$: instance = layerGroup;

	function reset() {
		layerGroup?.remove();
		layerGroup = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, Object.freeze({ ...parentContext, getLayer: () => layerGroup }));
</script>

<slot />
