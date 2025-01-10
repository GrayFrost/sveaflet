<script lang="ts">
	import { onMount, onDestroy, getContext, type Snippet } from 'svelte';
	import { bind, Map, Popup } from 'leaflet';
	import type { LatLngExpression, PopupOptions, Layer, Marker } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		latLng?: LatLngExpression;
		options?: PopupOptions;
		instance?: Popup;
		children?: Snippet;
	};

	let { latLng, options = {}, instance = $bindable(), children, ...restProps }: Props = $props();

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getOverlay } = parentContext;

	// data
	let ready = $state(false);
	let popup: Popup | undefined = $state();
	let map: Map | undefined = $state();
	let layer: Layer | Marker | undefined = $state();
	let compare: Compare | undefined = $state.raw();

	// refs
	let htmlElement: HTMLElement | undefined;

	$effect(() => {
		map = getMap?.();
		layer = getOverlay?.();
	});

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

		const props = {
			latLng,
			options
		};

		compare = new Compare(popup, { ...props, options: mergeOptions });
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (popup) {
				const props = {
					latLng,
					options
				};
				compare?.updateProps(props);

				if (!layer) {
					popup.openOn(map);
				} else {
					let popupContent = popup.options.content || '';
					layer.bindPopup(popupContent);
				}

				compare?.storeProps(props);
			}
		}
	});

	function reset() {
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
