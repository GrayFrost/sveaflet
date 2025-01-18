<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Icon, Marker } from 'leaflet';
	import type { IconOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { EventBridge } from './utils/index';

	// props
	type Props = {
		options?: IconOptions;
		instance?: Icon;
	} & { [key: string]: unknown };

	let { options = { iconUrl: '' }, instance = $bindable(), ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let icon: Icon | undefined = $state();
	let eventBridge: EventBridge<Icon> | undefined;

	let map = $derived(getMap?.());
	let layer = $derived(getOverlay?.());

	$effect(() => {
		instance = icon;
	});

	onMount(() => {
		icon = new Icon(options);
		eventBridge = new EventBridge(icon);
		eventBridge.addEvents(restProps);
	});

	$effect(() => {
		if (map) {
			if (icon) {
				if (layer && layer instanceof Marker) {
					layer.setIcon(icon);
				} else {
					console.warn('Icon should bind Marker.');
				}
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		icon?.remove?.();
		icon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
