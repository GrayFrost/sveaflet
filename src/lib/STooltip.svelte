<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from '$lib/context';

	// props
	export let latlng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let instance: Tooltip | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	// data
	let tooltip: Tooltip | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatLng = latlng;
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

		tooltip = latlng ? new Tooltip(latlng, mergeOptions) : new Tooltip(mergeOptions);
		storeProps({
			latlng,
			options: mergeOptions
		});
	});

	$: if ($mapStore) {
		if (tooltip) {
			updateLatLng(tooltip, preLatLng, latlng);
			updateContent(tooltip, preOptions, options);
			updateOpacity(tooltip, preOptions, options);

			if (!$layerStore) {
				tooltip.openOn($mapStore);
			} else {
				let tooltipContent = tooltip.options.content || '';
				$layerStore.bindTooltip(tooltipContent);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

	$: instance = tooltip;

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
	<div bind:this={htmlElement} {...$$restProps}>
		<slot />
	</div>
{/if}
