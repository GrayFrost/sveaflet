<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Map, LayerGroup } from 'leaflet';
	import type { LayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer } from './utils/index';

	
	interface Props {
		// props
		options?: LayerOptions;
		name?: string;
		checked?: boolean; // todo update should removelayer?
		instance?: LayerGroup | undefined;
		layerType?: 'base' | 'overlay' | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		options = {},
		name = '',
		checked = false,
		instance = $bindable(undefined),
		layerType = undefined,
		children
	}: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let layerGroup: LayerGroup | undefined = $state();
	let ready = $state(false);

	onMount(() => {
		layerGroup = new LayerGroup([], options);
		ready = true;
	});

	let map = $derived(getMap?.());
	let controlLayers = $derived(getControl?.());
	run(() => {
		instance = layerGroup;
	});

	run(() => {
		if (map) {
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
	});

	function reset() {
		layerGroup?.remove();
		layerGroup = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getLayer: () => layerGroup });
</script>

{#if ready}
	{@render children?.()}
{/if}
