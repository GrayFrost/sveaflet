<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

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
	let ready = false;
	let compare: Compare;

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
		} else {
			throw new Error('Prop latLng is required.');
		}
		compare = new Compare(popup, { ...$$props, options: mergeOptions });
		ready = true;
	});

	$: if (map) {
		if (popup) {
			compare.updateProps($$props);

			if (!layer) {
				popup.openOn(map);
			} else {
				let popupContent = popup.options.content || '';
				layer.bindPopup(popupContent);
			}

			compare.storeProps($$props);
		}
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
