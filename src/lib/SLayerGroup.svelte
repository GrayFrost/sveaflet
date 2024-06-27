<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Map, LayerGroup } from 'leaflet';
	import type { LayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer } from './utils';

	// props
	export let options: LayerOptions = {};
	export let name: string = '';
	export let checked: boolean = false; // todo update should removelayer?
	export let instance: LayerGroup | undefined = undefined;
	export let layerType: 'base' | 'overlay' | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let layerGroup: LayerGroup | undefined;
	let ready = false;

	onMount(() => {
		layerGroup = new LayerGroup([], options);
		ready = true;
	});

	$: map = getMap?.();
	$: controlLayers = getControl?.();
	$: instance = layerGroup;

	$: if (map) {
		if (layerGroup) {
			if (controlLayers) {
				if (!name) {
					console.warn('Name is required in ControlLayers');
				} else {
					setControlLayer({
						layer: layerGroup,
						name,
						controlLayers,
						layerType,
						map,
						checked
					});
				}
				controlLayers.addTo(map);
			} else {
				map.addLayer(layerGroup);
			}
		}
	}

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
