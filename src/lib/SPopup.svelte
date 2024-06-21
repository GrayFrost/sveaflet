<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions } from 'leaflet';
	import { useConsumeLayer, useConsumeMap } from '$lib/context';

	// props
	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {};
	export let instance: Popup | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerStore = useConsumeLayer();

	// data
	let popup: Popup | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatlng = latlng;
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
		popup = latlng ? new Popup(latlng, mergeOptions) : new Popup(mergeOptions);
		storeProps({
			latlng,
			options: mergeOptions
		});
	});

	$: if ($mapStore) {
		if (popup) {
			updateLatLng(popup, preLatlng, latlng);
			updateContent(popup, preOptions, options);

			if (!$layerStore) {
				popup.openOn($mapStore);
			} else {
				let popupContent = popup.options.content || '';
				$layerStore.bindPopup(popupContent);
			}
		}
		storeProps({
			latlng,
			options
		});
	}

	$: instance = popup;

	function updateLatLng(
		obj: Popup,
		preLatlng: LatLngExpression | undefined,
		latlng: LatLngExpression | undefined
	) {
		if (latlng !== preLatlng && latlng !== undefined) {
			obj.setLatLng(latlng);
		}
	}

	function updateContent(obj: Popup, preOpt: PopupOptions, opt: PopupOptions) {
		if (opt.content !== preOpt.content && opt.content !== undefined) {
			obj.setContent(opt.content);
		}
	}

	function storeProps(props: { latlng: LatLngExpression | undefined; options: PopupOptions }) {
		const { latlng, options } = props;
		preLatlng = latlng;
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
