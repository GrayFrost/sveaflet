<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from '$lib/context';

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {};
	export let instance: Popup | undefined = undefined;

	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	let popup: Popup | undefined;
	let htmlElement: HTMLElement | undefined;

	$: if ($mapStore) {
		let mergeOptions = {
			...options
		};
		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				content: htmlElement
			};
		}
		reset();
		popup = latlng ? new Popup(latlng, mergeOptions) : new Popup(mergeOptions);

		if (!$layerStore) {
			popup?.openOn($mapStore);
		} else {
			let popupContent = popup?.options.content || '';
			$layerStore.bindPopup(popupContent);
		}
	}

	$: instance = popup;

	function reset() {
		popup?.remove();
		popup = undefined;
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
