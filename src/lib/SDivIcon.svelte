<script lang="ts">
	import { run } from 'svelte/legacy';

	import { onMount, onDestroy, getContext } from 'svelte';
	import { DivIcon, Map, Marker } from 'leaflet';
	import type { DivIconOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	
	interface Props {
		// props
		options?: DivIconOptions;
		instance?: DivIcon | undefined;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { options = {}, instance = $bindable(undefined), children, ...rest }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let divIcon: DivIcon | undefined = $state();
	let htmlElement: HTMLElement | undefined = $state();
	let ready = $state(false);

	let map = $derived(getMap?.());
	let layer = $derived(getOverlay?.());
	run(() => {
		instance = divIcon;
	});

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

	run(() => {
		if (map) {
			if (divIcon) {
				if (layer && layer instanceof Marker) {
					layer.setIcon(divIcon);
				} else {
					console.warn('DivIcon should bind Marker.');
				}
			}
		}
	});

	function reset() {
		divIcon?.remove?.();
		divIcon = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

{#if children}
	<div style="display: none">
		<div bind:this={htmlElement} {...rest}>
			{#if ready}
				{@render children?.()}
			{/if}
		</div>
	</div>
{/if}
