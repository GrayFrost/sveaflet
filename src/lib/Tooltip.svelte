<script lang="ts">
	import { Tooltip } from 'leaflet';
	import type { LatLngExpression, Layer, TooltipOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from './context.ts';

	let { map: mapStore } = useConsumeMap();
	let layerStore = useConsumeLayer();

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: TooltipOptions = {};
	export let source: Layer | undefined = undefined;

	let tooltip: Tooltip | undefined;

	if ($mapStore) {
		if (latlng) {
			tooltip = new Tooltip(latlng, options);
		} else {
			tooltip = new Tooltip(options, source);
		}

		if (!$layerStore) {
			tooltip?.openOn($mapStore); // todo open
		} else {
			let tooltipContent = tooltip?.options.content || '';
			$layerStore.bindTooltip(tooltipContent).openTooltip(); // todo open
		}
	}
</script>
