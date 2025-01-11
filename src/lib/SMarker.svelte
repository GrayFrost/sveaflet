<script lang="ts">
	import { onMount, onDestroy, setContext, getContext, type Snippet } from 'svelte';
	import { Map, Marker, Icon } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, bindEvents } from './utils/index';

	// props
	type Props = {
		latLng: LatLngExpression;
		options?: MarkerOptions;
		instance?: Marker;
		children?: Snippet;
	};

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
	let compare: Compare | undefined = $state.raw();

	let map = $derived(getMap?.());
	let layer = $derived(getLayer?.());

	$effect(() => {
		instance = marker;
	});

	onMount(() => {
		const props = {
			latLng,
			options,
			...restProps
		};
		marker = new Marker(latLng, options);
		bindEvents(marker, restProps);
		compare = new Compare(marker, props);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (marker) {
				const props = {
					latLng,
					options,
					...restProps
				};

				compare?.updateProps(props);

				if (layer) {
					layer.addLayer(marker);
				} else {
					map.addLayer(marker);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
