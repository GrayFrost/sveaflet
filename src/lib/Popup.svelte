<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions, Layer } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from './context.ts';

	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {}; // todo 有两种类型

	let popup: Popup | undefined;
	let htmlElement: HTMLElement | undefined;

	$: if ($mapStore) {
		let mergeOptions = {
			...options
		};

		if (htmlElement) {
			// slot priority greater than string
			mergeOptions = {
				...mergeOptions,
				content: htmlElement
			};
		}

		if (latlng) {
			popup = new Popup(latlng, mergeOptions);
		} else {
			popup = new Popup(mergeOptions);
		}

		if (!$layerStore) {
			popup?.openOn($mapStore);
		} else {
			let popupContent = popup?.options.content || ''; // TODO: popup slot content
			$layerStore.bindPopup(popupContent);
		}
	}

	onDestroy(() => {
		popup?.remove();
		popup = undefined;
	});
</script>

{#if $$slots.default}
	<div bind:this={htmlElement}>
		<slot />
	</div>
{/if}
