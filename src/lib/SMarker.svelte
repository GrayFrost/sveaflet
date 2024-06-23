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
	export let latlng: LatLngExpression;
	export let options: MarkerOptions = {
		icon: new Icon.Default()
	};
	export let instance: Marker | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let markerStore = writable<Marker | undefined>();

	// data
	let preLatLng = latlng;
	let preOptions = options;

	onMount(() => {
		$markerStore = new Marker(latlng, options);
		storeProps({
			latlng,
			options
		});
	});

	$: if ($mapStore) {
		if ($markerStore) {
			updateLatLng($markerStore, preLatLng, latlng);
			updateZIndexOffset($markerStore, preOptions, options);
			updateOpacity($markerStore, preOptions, options);
			if ($layerGroupStore) {
				$layerGroupStore.addLayer($markerStore);
			} else {
				$markerStore.addTo($mapStore);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

	$: instance = $markerStore;

	function updateLatLng(obj: Marker, preLatLng: LatLngExpression, latlng: LatLngExpression) {
		if (latlng !== preLatLng && latlng !== undefined) {
			obj.setLatLng(latlng);
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

	function storeProps(props: { latlng: LatLngExpression; options: MarkerOptions }) {
		const { latlng, options } = props;
		preLatLng = latlng;
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
