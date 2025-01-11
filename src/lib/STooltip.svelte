<script lang="ts">
	import { onMount, onDestroy, getContext, type Snippet } from 'svelte';
	import { Map, Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions, Layer, Marker } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, bindEvents } from './utils/index';

	// props
	type Props = {
		latLng?: LatLngExpression;
		options?: TooltipOptions;
		instance?: Tooltip;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { latLng, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let ready = $state(false);
	let tooltip: Tooltip | undefined = $state();
	let compare: Compare | undefined = $state.raw();

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

		bindEvents(tooltip, restProps);

		const props = {
			latLng,
			options,
			...restProps
		};

		compare = new Compare(tooltip, { ...props, options: mergeOptions });
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (tooltip) {
				const props = {
					latLng,
					options,
					...restProps
				};

				compare?.updateProps(props);

				if (!layer) {
					tooltip.openOn(map);
				} else {
					let tooltipContent = tooltip.options.content || '';
					layer.bindTooltip(tooltipContent);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
