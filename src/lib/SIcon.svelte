<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Icon } from 'leaflet';
	import type { IconOptions } from 'leaflet';

	// props
	export let options: IconOptions = { iconUrl: '' };
	export let instance: Icon | undefined = undefined;

	// store
	let parentContext: any = getContext(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let icon: Icon | undefined;

	onMount(() => {
		icon = new Icon(options);
	});

	$: map = getMap?.();
	$: layer = getOverlay?.();

	$: if (map) {
		if (icon) {
			if (layer) {
				layer.setIcon(icon);
			} else {
				console.warn('Icon should bind Marker.');
			}
		}
	}

	$: instance = icon;

	function reset() {
		icon?.remove?.();
		icon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>
