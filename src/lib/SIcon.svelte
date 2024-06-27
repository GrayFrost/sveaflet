<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Icon, Marker } from 'leaflet';
	import type { IconOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: IconOptions = { iconUrl: '' };
	export let instance: Icon | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let icon: Icon | undefined;

	onMount(() => {
		icon = new Icon(options);
	});

	$: map = getMap?.();
	$: layer = getOverlay?.();
	$: instance = icon;

	$: if (map) {
		if (icon) {
			if (layer && layer instanceof Marker) {
				layer.setIcon(icon);
			} else {
				console.warn('Icon should bind Marker.');
			}
		}
	}

	function reset() {
		icon?.remove?.();
		icon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
