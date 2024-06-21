<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polyline } from 'leaflet';
	import type { LatLngExpression, PathOptions, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let polylineStore = writable<Polyline | undefined>();

	// data
	let preLatlngs = latlngs;
	let preOptions = options;

	onMount(() => {
		$polylineStore = new Polyline(latlngs, options);

		storeProps({
			latlngs,
			options
		});
	});

	$: if ($mapStore) {
		if ($polylineStore) {
			updateLatLngs($polylineStore, preLatlngs, latlngs);
			updateStyle($polylineStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($polylineStore);
			} else {
				$polylineStore.addTo($mapStore);
			}
			storeProps({
				latlngs,
				options
			});
		}
	}

	$: instance = $polylineStore;

	function updateLatLngs(
		obj: Polyline,
		preLatlngs: LatLngExpression[],
		latlngs: LatLngExpression[]
	) {
		if (preLatlngs !== latlngs && latlngs !== undefined) {
			obj.setLatLngs(latlngs);
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

	function storeProps(props: { latlngs: LatLngExpression[]; options: PolylineOptions }) {
		const { latlngs, options } = props;
		preLatlngs = latlngs;
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
