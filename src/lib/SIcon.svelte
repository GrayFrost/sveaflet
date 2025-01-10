<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Icon, Marker } from 'leaflet';
	import type { IconOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	
	interface Props {
		// props
		options?: IconOptions;
		instance?: Icon | undefined;
	}

	let { options = { iconUrl: '' }, instance = $bindable(undefined) }: Props = $props();

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
	run(() => {
		instance = icon;
	});

	run(() => {
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
