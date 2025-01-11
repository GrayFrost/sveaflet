<script lang="ts">
	import { onMount, onDestroy, getContext, type Snippet } from 'svelte';
	import { DivIcon, Map, Marker } from 'leaflet';
	import type { DivIconOptions } from 'leaflet';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LeafletContextInterface } from './types';

	// props
	type Props = {
		options?: DivIconOptions;
		instance?: DivIcon;
		children?: Snippet;
	} & HTMLAttributes<HTMLDivElement>;

	let { options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let ready = $state(false);
	let divIcon: DivIcon | undefined = $state();

	let map = $derived(getMap?.());
	let layer = $derived(getOverlay?.());

	// refs
	let htmlElement: HTMLElement | undefined = $state();

	$effect(() => {
		instance = divIcon;
	});

	onMount(() => {
		let mergeOptions = {
			...options,
			...restProps,
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

	$effect(() => {
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
		<div bind:this={htmlElement} {...restProps}>
			{#if ready}
				{@render children?.()}
			{/if}
		</div>
	</div>
{/if}
