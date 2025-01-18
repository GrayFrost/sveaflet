<script lang="ts">
	import { onMount, onDestroy, setContext, type Snippet } from 'svelte';
	import { Map, Icon } from 'leaflet';
	import type { MapOptions } from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
	import markerIcon from 'leaflet/dist/images/marker-icon.png';
	import markerShadow from 'leaflet/dist/images/marker-shadow.png';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// @ts-ignore
	delete Icon.Default.prototype._getIconUrl;
	Icon.Default.mergeOptions({
		iconRetinaUrl: markerIcon2x,
		iconUrl: markerIcon,
		shadowUrl: markerShadow
	});

	// props
	type Props = {
		options: MapOptions;
		instance?: Map;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// state
	let map: Map | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Map> | undefined

	// refs
	let mapContainer: HTMLElement;

	$effect(() => {
		instance = map;
	});

	let latestProps = $derived.by(() => ({
		options,
		...restProps
	}))

	onMount(() => {
		map = new Map(mapContainer, options);
		eventBridge = new EventBridge(map);
		eventBridge.addEvents(restProps);
		compare = new Compare(map, latestProps);
	});

	$effect(() => {
		if (map) {
			compare?.updateProps(latestProps);
			compare?.storeProps(latestProps);
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		map?.remove();
		map = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext<LeafletContextInterface>(Map, { getMap: () => map });
</script>

<div style="width:100%;height:100%" bind:this={mapContainer}>
	{#if map}
		{@render children?.()}
	{/if}
</div>
