<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Polygon } from 'leaflet';
	import type { LatLngExpression, PathOptions, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latLngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let polygonStore = writable<Polygon | undefined>();

	// data
	let preLatLngs = latLngs;
	let preOptions = options;

	onMount(() => {
		$polygonStore = new Polygon(latLngs, options);
		storeProps({
			latLngs,
			options
		});
	});

	$: if ($mapStore) {
		if ($polygonStore) {
			updateLatLngs($polygonStore, preLatLngs, latLngs);
			updateStyle($polygonStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($polygonStore);
			} else {
				$polygonStore.addTo($mapStore);
			}
			storeProps({
				latLngs,
				options
			});
		}
	}

	$: instance = $polygonStore;

	function updateLatLngs(
		obj: Polygon,
		preLatLngs: LatLngExpression[],
		latLngs: LatLngExpression[]
	) {
		if (preLatLngs !== latLngs && latLngs !== undefined) {
			obj.setLatLngs(latLngs);
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

	function storeProps(props: { latLngs: LatLngExpression[]; options: PolylineOptions }) {
		const { latLngs, options } = props;
		preLatLngs = latLngs;
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
