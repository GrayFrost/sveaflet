<script lang="ts">
	import { type LatLngExpression, type Layer, Tooltip, type TooltipOptions } from 'leaflet';
	import { useConsumeMarker, useConsumeMap } from './context.ts';

	let { map: mapStore } = useConsumeMap();
	let markerStore = useConsumeMarker();

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
	}

	if (!$markerStore && $mapStore) {
		tooltip?.openOn($mapStore);
	} else if ($markerStore) {
		let tooltipContent = tooltip?.options.content || '';
		$markerStore.bindTooltip(tooltipContent).openTooltip(); // todo open
	}
</script>
