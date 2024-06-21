<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from '$lib/context';

	// props
	export let latLng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {};
	export let instance: Popup | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	// data
	let popup: Popup | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatLng = latLng;
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
		popup = latLng ? new Popup(latLng, mergeOptions) : new Popup(mergeOptions);
		storeProps({
			latLng,
			options: mergeOptions
		});
	});

	$: if ($mapStore) {
		if (popup) {
			updateLatLng(popup, preLatLng, latLng);
			updateContent(popup, preOptions, options);

			if (!$layerStore) {
				popup.openOn($mapStore);
			} else {
				let popupContent = popup.options.content || '';
				$layerStore.bindPopup(popupContent);
			}
		}
		storeProps({
			latLng,
			options
		});
	}

	$: instance = popup;

	function updateLatLng(
		obj: Popup,
		preLatLng: LatLngExpression | undefined,
		latLng: LatLngExpression | undefined
	) {
		if (latLng !== preLatLng && latLng !== undefined) {
			obj.setLatLng(latLng);
		}
	}

	function updateContent(obj: Popup, preOpt: PopupOptions, opt: PopupOptions) {
		if (opt.content !== preOpt.content && opt.content !== undefined) {
			obj.setContent(opt.content);
		}
	}

	function storeProps(props: { latLng: LatLngExpression | undefined; options: PopupOptions }) {
		const { latLng, options } = props;
		preLatLng = latLng;
		preOptions = Object.create(options);
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
