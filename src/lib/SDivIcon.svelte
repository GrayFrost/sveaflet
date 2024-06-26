<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { DivIcon, Map } from 'leaflet';
	import type { DivIconOptions } from 'leaflet';

	// props
	export let options: DivIconOptions = {};
	export let instance: DivIcon | undefined = undefined;

	// store
	let parentContext: any = getContext(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let divIcon: DivIcon | undefined;
	let htmlElement: HTMLElement | undefined;

	$: map = getMap?.();
	$: layer = getOverlay?.();

	let ready = false;

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
			if (layer) {
				layer.setIcon(divIcon);
			} else {
				console.warn('DivIcon should bind Marker.');
			}
		}
	}

	$: instance = divIcon;

	function reset() {
		divIcon?.remove?.();
		divIcon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

{#if ready && $$slots.default}
	<div bind:this={htmlElement} {...$$restProps}>
		<slot />
	</div>
{/if}
