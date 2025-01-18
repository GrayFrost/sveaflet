<script lang="ts">
	import { onMount, onDestroy, getContext, type Snippet } from 'svelte';
	import { Map, Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions, Layer, Marker } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare, EventBridge } from './utils/index';

	// props
	type Props = {
		latLng?: LatLngExpression;
		options?: PopupOptions;
		instance?: Popup;
		children?: Snippet;
	} & { [key: string]: unknown };

	let { latLng, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	let latestProps = $derived.by(() => ({
		latLng,
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let ready = $state(false);
	let popup: Popup | undefined = $state();
	let compare: Compare | undefined;
	let eventBridge: EventBridge<Popup> | undefined;

	let map: Map | undefined = $derived(getMap?.());
	let layer: Layer | Marker | undefined = $derived(getOverlay?.());

	// refs
	let htmlElement: HTMLElement | undefined = $state();

	$effect(() => {
		instance = popup;
	});

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

		eventBridge = new EventBridge(popup);
		eventBridge.addEvents(restProps);
		compare = new Compare(popup, { ...latestProps, options: mergeOptions });
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (popup) {
				compare?.updateProps(latestProps);

				if (!layer) {
					popup.openOn(map);
				} else {
					let popupContent = popup.options.content || '';
					layer.bindPopup(popupContent);
				}

				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		eventBridge?.removeEvents();
		popup?.remove();
		popup = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

{#if children}
	<div style="display: none">
		<div bind:this={htmlElement} {...restProps}>
			{#if ready}
				{@render children()}
			{/if}
		</div>
	</div>
{/if}
