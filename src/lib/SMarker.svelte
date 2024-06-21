<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Marker, Icon } from 'leaflet';
	import type { LatLngExpression, MarkerOptions } from 'leaflet';
	import {
		useConsumeMap,
		useConsumeLayerGroup,
		useProvideLayer,
		useProvideMarker
	} from '$lib/context';

	// props
	export let latLng: LatLngExpression;
	export let options: MarkerOptions = {
		icon: new Icon.Default()
	};
	export let instance: Marker | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let markerStore = writable<Marker | undefined>();

	// data
	let preLatLng = latLng;
	let preOptions = options;

	onMount(() => {
		$markerStore = new Marker(latLng, options);
		storeProps({
			latLng,
			options
		});
	});

	$: if ($mapStore) {
		if ($markerStore) {
			updateLatLng($markerStore, preLatLng, latLng);
			updateZIndexOffset($markerStore, preOptions, options);
			updateOpacity($markerStore, preOptions, options);
			if ($layerGroupStore) {
				$layerGroupStore.addLayer($markerStore);
			} else {
				$markerStore.addTo($mapStore);
			}
			storeProps({
				latLng,
				options
			});
		}
	}

	$: instance = $markerStore;

	function updateLatLng(obj: Marker, preLatLng: LatLngExpression, latLng: LatLngExpression) {
		if (latLng !== preLatLng && latLng !== undefined) {
			obj.setLatLng(latLng);
		}
	}

	function updateZIndexOffset(obj: Marker, preOpt: MarkerOptions, opt: MarkerOptions) {
		if (opt.zIndexOffset !== preOpt.zIndexOffset && opt.zIndexOffset !== undefined) {
			obj.setZIndexOffset(opt.zIndexOffset);
		}
	}

	function updateOpacity(obj: Marker, preOpt: MarkerOptions, opt: MarkerOptions) {
		if (opt.opacity !== preOpt.opacity && opt.opacity !== undefined) {
			obj.setOpacity(opt.opacity);
		}
	}

	function storeProps(props: { latLng: LatLngExpression; options: MarkerOptions }) {
		const { latLng, options } = props;
		preLatLng = latLng;
		preOptions = Object.create(options);
	}

	function reset() {
		$markerStore?.remove();
		$markerStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(markerStore);
	useProvideMarker(markerStore);
</script>

<slot />
