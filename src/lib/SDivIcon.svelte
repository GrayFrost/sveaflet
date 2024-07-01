<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { DivIcon, Map, Marker } from 'leaflet';
	import type { DivIconOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let options: DivIconOptions = {};
	export let instance: DivIcon | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let divIcon: DivIcon | undefined;
	let htmlElement: HTMLElement | undefined;
	let ready = false;

	$: map = getMap?.();
	$: layer = getOverlay?.();
	$: instance = divIcon;

	onMount(() => {
		let mergeOptions = {
			...options
		};
		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				html: htmlElement // override options
			};
		}
		divIcon = new DivIcon(mergeOptions);
		ready = true;
	});

	$: if (map) {
		if (divIcon) {
			if (layer && layer instanceof Marker) {
				layer.setIcon(divIcon);
			} else {
				console.warn('DivIcon should bind Marker.');
			}
		}
	}

	function reset() {
		divIcon?.remove?.();
		divIcon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

{#if $$slots.default}
	<div style="display: none">
		<div bind:this={htmlElement} {...$$restProps}>
			{#if ready}
				<slot />
			{/if}
		</div>
	</div>
{/if}
