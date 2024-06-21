<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from '$lib/context';

	// props
	export let latLng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let instance: Tooltip | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	// data
	let tooltip: Tooltip | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatLng = latLng;
	let preOptions = options;

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

		tooltip = latLng ? new Tooltip(latLng, mergeOptions) : new Tooltip(mergeOptions);
		storeProps({
			latLng,
			options: mergeOptions
		});
	});

	$: if ($mapStore) {
		if (tooltip) {
			updateLatLng(tooltip, preLatLng, latLng);
			updateContent(tooltip, preOptions, options);
			updateOpacity(tooltip, preOptions, options);

			if (!$layerStore) {
				tooltip.openOn($mapStore);
			} else {
				let tooltipContent = tooltip.options.content || '';
				$layerStore.bindTooltip(tooltipContent);
			}
			storeProps({
				latLng,
				options
			});
		}
	}

	$: instance = tooltip;

	function updateLatLng(
		obj: Tooltip,
		preLatLng: LatLngExpression | undefined,
		latLng: LatLngExpression | undefined
	) {
		if (latLng !== preLatLng && latLng !== undefined) {
			obj.setLatLng(latLng);
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

	function storeProps(props: { latLng: LatLngExpression | undefined; options: TooltipOptions }) {
		const { latLng, options } = props;
		preLatLng = latLng;
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
	<div bind:this={htmlElement} {...$$restProps}>
		<slot />
	</div>
{/if}
