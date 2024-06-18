<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from './context.ts';

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let instance: Tooltip | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	let tooltip: Tooltip | undefined;

	$: if ($mapStore) {
		reset();
		if (latlng) {
			tooltip = new Tooltip(latlng, options);
		} else {
			tooltip = new Tooltip(options);
		}

		if (!$layerStore) {
			tooltip?.openOn($mapStore); // todo open
		} else {
			let tooltipContent = tooltip?.options.content || '';
			$layerStore.bindTooltip(tooltipContent).openTooltip(); // todo open
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
