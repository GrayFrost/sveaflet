<script lang="ts">
	import { type LatLngExpression, type MarkerOptions, Marker } from 'leaflet';
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { useConsumeMap } from './Map.svelte';
	import { useConsumePopup } from './Popup.svelte';

	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {};

	let map = useConsumeMap()();
	let popupStore = useConsumePopup()(); // TODO 处理组件不挂载在其中的错误

	let marker: Marker | undefined;

	onMount(() => {
		if (map) {
			marker = new Marker(latlng, options);
			marker.addTo(map);
		}
	});

	onDestroy(() => {});

	$: if ($popupStore && marker) {
		let popupContent = $popupStore.options.content || '';
		marker.bindPopup(popupContent).openPopup();
	}

  $: console.log('zzh popup', $popupStore, marker, map);
</script>
