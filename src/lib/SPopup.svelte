<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latLng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {};
	export let instance: Popup | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let popup: Popup | undefined;
	let htmlElement: HTMLElement | undefined;
	let preLatLng = latLng;
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
		if (!latLng && layer) {
			popup = new Popup(mergeOptions, layer);
		} else if (latLng) {
			popup = new Popup(latLng, mergeOptions);
		}
		storeProps({
			latLng,
			options: mergeOptions
		});
		ready = true;
	});

	$: if (map) {
		if (popup) {
			updateLatLng(popup, preLatLng, latLng);
			updateContent(popup, preOptions, options);

			if (!layer) {
				popup.openOn(map);
			} else {
				let popupContent = popup.options.content || '';
				layer.bindPopup(popupContent);
			}
		}
		storeProps({
			latLng,
			options
		});
	}

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
	<div style="display: none">
		<div bind:this={htmlElement} {...$$restProps}>
			{#if ready}
				<slot />
			{/if}
		</div>
	</div>
{/if}
