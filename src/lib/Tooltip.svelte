<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Tooltip } from 'leaflet';
	import type { LatLngExpression, TooltipOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from './context.ts';

	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};

	let tooltip: Tooltip | undefined;

	$: if ($mapStore) {
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

	onDestroy(() => {
		tooltip?.remove();
		tooltip = undefined;
	});
</script>
