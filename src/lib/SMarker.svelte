<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Map, Marker, Icon } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLng: LatLngExpression;
		options?: MarkerOptions;
		instance?: Marker;
		children?: Snippet;
	} & { [key: string]: unknown };

	let {
		latLng,
		options = {
			icon: new Icon.Default()
		},
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let ready = $state(false);
	let marker: Marker | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Marker> | undefined;

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	let latestProps = $derived.by(() => ({
		latLng,
		options,
		...restProps
	}));

	$effect(() => {
		instance = marker;
	});

	onMount(() => {
		marker = new Marker(latLng, options);
		eventBridge = new EventBridge(marker);
		eventBridge.addEvents(restProps);
		compare = new Compare(marker, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (marker) {
				compare?.updateProps(latestProps);

				if (layer) {
					layer.addLayer(marker);
				} else {
					map.addLayer(marker);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		marker?.remove();
		marker = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => marker });
</script>

{#if ready}
	{@render children?.()}
{/if}
