<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Icon, Marker } from 'leaflet';
	import type { IconOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	interface Props {
		options?: IconOptions;
		instance?: Icon;
	}

	let { options = { iconUrl: '' }, instance = $bindable() }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let icon: Icon | undefined = $state();

	onMount(() => {
		icon = new Icon(options);
	});

	let map = $derived(getMap?.());
	let layer = $derived(getOverlay?.());

	$effect(() => {
		instance = icon;
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
		icon?.remove?.();
		icon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
