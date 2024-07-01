<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// FIXME: extra htmlelement when popup with slot content in other layers
	// props
	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {};
	export let instance: Popup | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let popup: Popup | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatLng = latlng;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getOverlay?.();
	$: instance = popup;

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
		if (!latlng && layer) {
			popup = new Popup(mergeOptions, layer);
		} else if (latlng) {
			popup = new Popup(latlng, mergeOptions);
		}
		storeProps({
			latlng,
			options: mergeOptions
		});
		ready = true;
	});

	$: if (map) {
		if (popup) {
			updateLatLng(popup, preLatLng, latlng);
			updateContent(popup, preOptions, options);

			if (!layer) {
				popup.openOn(map);
			} else {
				let popupContent = popup.options.content || '';
				layer.bindPopup(popupContent);
			}
		}
		storeProps({
			latlng,
			options
		});
	}

	function updateLatLng(
		obj: Popup,
		preLatLng: LatLngExpression | undefined,
		latlng: LatLngExpression | undefined
	) {
		if (latlng !== preLatLng && latlng !== undefined) {
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
		preLatLng = latlng;
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
		{#if ready}
			<slot />
		{/if}
	</div>
{/if}
