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

	$: if ($mapStore) {
		// todo slot content
		if (!tooltip) {
			tooltip = latlng ? new Tooltip(latlng, options) : new Tooltip(options);
		}

		latlng && tooltip.setLatLng(latlng);

		if (!$layerStore) {
			tooltip?.openOn($mapStore);
		} else {
			let tooltipContent = tooltip?.options.content || '';
			$layerStore.bindTooltip(tooltipContent);
		}
	}

	$: instance = tooltip;

	onDestroy(() => {
		tooltip?.remove();
		tooltip = undefined;
	});
</script>