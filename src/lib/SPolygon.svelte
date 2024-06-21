<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polygon } from 'leaflet';
	import type { LatLngExpression, PathOptions, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latlngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let polygonStore = writable<Polygon | undefined>();

	// data
	let preLatlngs = latlngs;
	let preOptions = options;

	onMount(() => {
		$polygonStore = new Polygon(latlngs, options);
		storeProps({
			latlngs,
			options
		});
	});

	$: if ($mapStore) {
		if ($polygonStore) {
			updateLatLngs($polygonStore, preLatlngs, latlngs);
			updateStyle($polygonStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($polygonStore);
			} else {
				$polygonStore.addTo($mapStore);
			}
			storeProps({
				latlngs,
				options
			});
		}
	}

	$: instance = $polygonStore;

	function updateLatLngs(
		obj: Polygon,
		preLatlngs: LatLngExpression[],
		latlngs: LatLngExpression[]
	) {
		if (preLatlngs !== latlngs && latlngs !== undefined) {
			obj.setLatLngs(latlngs);
		}
	}

	function updateStyle(obj: Polygon, preOpt: PolylineOptions, opt: PolylineOptions) {
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
		$polygonStore?.remove();
		$polygonStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(polygonStore);
</script>

<slot />
