<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let latLng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let instance: Tooltip | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let tooltip: Tooltip | undefined;
	let htmlElement: HTMLElement | undefined;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: layer = getOverlay?.();
	$: instance = tooltip;

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

		compare = new Compare(tooltip, { ...$$props, options: mergeOptions });
		ready = true;
	});

	$: if (map) {
		if (tooltip) {
			compare.updateProps($$props);

			if (!layer) {
				tooltip.openOn(map);
			} else {
				let tooltipContent = tooltip.options.content || '';
				layer.bindTooltip(tooltipContent);
			}

			compare.storeProps($$props);
		}
	}

	function reset() {
		tooltip?.remove();
		tooltip = undefined;
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
