<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Map, LayerGroup } from 'leaflet';
	import type { LayerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { setControlLayer } from './utils/index';

	// props
	interface Props {
		options?: LayerOptions;
		name?: string;
		checked?: boolean; // todo update should removelayer?
		instance?: LayerGroup;
		layerType?: 'base' | 'overlay';
		children?: Snippet;
	}

	let {
		options = {},
		name = '',
		checked = false,
		instance = $bindable(),
		layerType,
		children
	}: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getControl } = parentContext;

	// data
	let ready = $state(false);
	let layerGroup: LayerGroup | undefined = $state();
	let map = $derived(getMap?.());
	let controlLayers = $derived(getControl?.());

	onMount(() => {
		layerGroup = new LayerGroup([], options);
		ready = true;
	});

	$effect(() => {
		instance = layerGroup;
	});

	$effect(() => {
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
