<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latlng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let instance: Tooltip | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let tooltip: Tooltip | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatLng = latlng;
	let preOptions = options;
	let ready = false;

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
		if (!latlng && layer) {
			tooltip = new Tooltip(mergeOptions, layer);
		} else if (latlng) {
			tooltip = new Tooltip(latlng, mergeOptions);
		}
		storeProps({
			latlng,
			options: mergeOptions
		});
		ready = true;
	});

	$: if (map) {
		if (tooltip) {
			updateLatLng(tooltip, preLatLng, latlng);
			updateContent(tooltip, preOptions, options);
			updateOpacity(tooltip, preOptions, options);

			if (!layer) {
				tooltip.openOn(map);
			} else {
				let tooltipContent = tooltip.options.content || '';
				layer.bindTooltip(tooltipContent);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

	function updateLatLng(
		obj: Tooltip,
		preLatLng: LatLngExpression | undefined,
		latlng: LatLngExpression | undefined
	) {
		if (latlng !== preLatLng && latlng !== undefined) {
			obj.setLatLng(latlng);
		}
	}

	function updateContent(obj: Tooltip, preOpt: TooltipOptions, opt: TooltipOptions) {
		if (opt.content !== preOpt.content && opt.content !== undefined) {
			obj.setContent(opt.content);
		}
	}

	function updateOpacity(obj: Tooltip, preOpt: TooltipOptions, opt: TooltipOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function storeProps(props: { latlng: LatLngExpression | undefined; options: TooltipOptions }) {
		const { latlng, options } = props;
		preLatLng = latlng;
		preOptions = Object.create(options);
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
