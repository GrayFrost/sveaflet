<script lang="ts">
	import { onMount, onDestroy, getContext, type Snippet } from 'svelte';
	import { Map, Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions, Layer, Marker } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLng?: LatLngExpression;
		options?: TooltipOptions;
		instance?: Tooltip;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { latLng, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	let latestProps = $derived.by(() => ({
		latLng,
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let ready = $state(false);
	let tooltip: Tooltip | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Tooltip> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: Layer | Marker | undefined = $derived(getOverlay?.());

	// refs
	let htmlElement: HTMLElement | undefined = $state();

	$effect(() => {
		instance = tooltip;
	});

	onMount(() => {
		let mergeOptions = {
			...options
		};

		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				content: htmlElement
			};
		}

		if (!latLng && layer) {
			tooltip = new Tooltip(mergeOptions, layer);
		} else if (latLng) {
			tooltip = new Tooltip(latLng, mergeOptions);
		} else {
			throw new Error('Prop latLng is required.');
		}

		eventBridge = new EventBridge(tooltip);
		eventBridge.addEvents(restProps);
		compare = new Compare(tooltip, { ...latestProps, options: mergeOptions });
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (tooltip) {
				compare?.updateProps(latestProps);

				if (!layer) {
					tooltip.openOn(map);
				} else {
					let tooltipContent = tooltip.options.content || '';
					layer.bindTooltip(tooltipContent);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		tooltip?.remove();
		tooltip = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

{#if children}
	<div style="display: none">
		<div bind:this={htmlElement} {...restProps}>
			{#if ready}
				{@render children()}
			{/if}
		</div>
	</div>
{/if}
