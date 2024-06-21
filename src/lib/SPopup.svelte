<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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

	let preLatlng = latlng;
	let preOptions = options;

	let mergeOptions = Object.create(options);

	onMount(() => {
		mergeOptions = {
			...options
		};
		if (htmlElement) {
			mergeOptions = {
				...mergeOptions,
				content: htmlElement
			};
		}
		popup = latlng ? new Popup(latlng, mergeOptions) : new Popup(mergeOptions);
		storeProps();
	});

	$: if ($mapStore) {
		if (popup) {
			if (latlng !== preLatlng && latlng !== undefined) {
				popup.setLatLng(latlng);
			}
			if (!$layerStore) {
				popup.openOn($mapStore);
			} else {
				let popupContent = popup.options.content || '';
				$layerStore.bindPopup(popupContent);
			}
		}
		storeProps();
	}

	$: instance = popup;

	function storeProps() {
		preLatlng = latlng;
		preOptions = Object.create(mergeOptions);
	}

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
