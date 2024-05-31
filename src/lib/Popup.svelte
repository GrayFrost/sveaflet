<script context="module" lang="ts">
	import { getContext, setContext } from 'svelte';
  import { type Writable } from 'svelte/store';
	import { Popup } from 'leaflet';
	export interface PopupContext {
		(): Writable<Popup | undefined>;
	}
	export const PopupContextKey = Symbol();
	export const useProvidePopup = (state: PopupContext) => {
		setContext<PopupContext>(PopupContextKey, state);
	};

	export const useConsumePopup = (): PopupContext => {
		return getContext<PopupContext>(PopupContextKey);
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
	import { useConsumeMap } from './Map.svelte';
	import { type LatLngExpression, type PopupOptions, type Layer } from 'leaflet';

	let popupStore = writable<Popup | undefined>();

	useProvidePopup(() => popupStore);

	let map = useConsumeMap()();

	export let latlng: LatLngExpression | undefined = undefined;
	export let options: PopupOptions = {}; // todo 有两种类型
	export let source: Layer | undefined = undefined;

	$: hasChildren = !!$$slots.default;

	onMount(() => {
		if (map) {
			if (latlng) {
				$popupStore = new Popup(latlng, options);
			} else {
				$popupStore = new Popup(options, source);
			}
		}
	});

	$: {
		if (!hasChildren && map) {
			$popupStore?.openOn(map);
		}
	}
</script>

<slot />
