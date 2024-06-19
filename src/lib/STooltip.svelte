<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from '$lib/context';

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let instance: Tooltip | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	let tooltip: Tooltip | undefined;
	let htmlElement: HTMLElement | undefined;

	$: if ($mapStore) {
		let mergeOptions = {
			...options
		};
		console.log('zzh options', mergeOptions);
		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				content: htmlElement
			};
		}
		reset();
		tooltip = latlng ? new Tooltip(latlng, mergeOptions) : new Tooltip(mergeOptions);

		if (!$layerStore) {
			tooltip?.openOn($mapStore);
		} else {
			let tooltipContent = tooltip?.options.content || '';
			$layerStore.bindTooltip(tooltipContent);
		}
	}

	$: instance = tooltip;

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
