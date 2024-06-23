<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polyline } from 'leaflet';
	import type { LatLngExpression, PathOptions, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latLngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let polylineStore = writable<Polyline | undefined>();

	// data
	let preLatLngs = latLngs;
	let preOptions = options;

	onMount(() => {
		$polylineStore = new Polyline(latLngs, options);

		storeProps({
			latLngs,
			options
		});
	});

	$: if ($mapStore) {
		if ($polylineStore) {
			updateLatLngs($polylineStore, preLatLngs, latLngs);
			updateStyle($polylineStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($polylineStore);
			} else {
				$polylineStore.addTo($mapStore);
			}
			storeProps({
				latLngs,
				options
			});
		}
	}

	$: instance = $polylineStore;

	function updateLatLngs(
		obj: Polyline,
		preLatLngs: LatLngExpression[],
		latLngs: LatLngExpression[]
	) {
		if (preLatLngs !== latLngs && latLngs !== undefined) {
			obj.setLatLngs(latLngs);
		}
	}

	function updateStyle(obj: Polyline, preOpt: PolylineOptions, opt: PolylineOptions) {
		const keys: Array<keyof PathOptions> = [
			'stroke',
			'color',
			'weight',
			'opacity',
			'lineCap',
			'lineJoin',
			'dashArray',
			'dashOffset',
			'fill',
			'fillColor',
			'fillOpacity',
			'fillRule',
			'renderer',
			'className'
		];

		const styles: Partial<Record<keyof PathOptions, any>> = {};
		keys.forEach((key) => {
			if (opt[key] !== preOpt[key] && opt[key] !== undefined) {
				styles[key] = opt[key];
			}
		});
		obj.setStyle(styles);
	}

	function storeProps(props: { latLngs: LatLngExpression[]; options: PolylineOptions }) {
		const { latLngs, options } = props;
		preLatLngs = latLngs;
		preOptions = Object.create(options);
	}

	function reset() {
		$polylineStore?.remove();
		$polylineStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(polylineStore);
</script>

<slot />
