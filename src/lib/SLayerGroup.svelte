<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Map, LayerGroup } from 'leaflet';
	import type { LayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: LayerOptions = {};
	export let name: string = '';
	export let checked: boolean = false; // todo update should removelayer?
	export let instance: LayerGroup | undefined = undefined;
	export let layerType: 'base' | 'overlay' | undefined = undefined;

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
				if (!name) {
					console.warn('Name is required in ControlLayers');
				} else {
					if (layerType === 'base') {
						if (checked) {
							map.addLayer(layerGroup);
							controlLayers.addBaseLayer(layerGroup, name);
						} else {
							controlLayers.addBaseLayer(layerGroup, name);
						}
					} else if (layerType === 'overlay') {
						if (checked) {
							map.addLayer(layerGroup);
							controlLayers.addOverlay(layerGroup, name);
						} else {
							controlLayers.addOverlay(layerGroup, name);
						}
					}
				}
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

{#if ready}
	<slot />
{/if}
