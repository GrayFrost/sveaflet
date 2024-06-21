<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { CircleMarker } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, PathOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let circleMarkerStore = writable<CircleMarker | undefined>();

	// data
	let preLatLng = latlng;
	let preOptions = options;

	onMount(() => {
		$circleMarkerStore = new CircleMarker(latlng, options);
		storeProps({
			latlng,
			options
		});
	});

	$: if ($mapStore) {
		if ($circleMarkerStore) {
			updatetLatLng($circleMarkerStore, preLatLng, latlng);

			updateRadius($circleMarkerStore, preOptions, options);

			updateStyle($circleMarkerStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($circleMarkerStore);
			} else {
				$circleMarkerStore.addTo($mapStore);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

	$: instance = $circleMarkerStore;

	function updatetLatLng(obj: CircleMarker, preLatLng: LatLngExpression, latlng: LatLngExpression) {
		if (latlng !== preLatLng && latlng !== undefined) {
			obj.setLatLng(latlng);
		}
	}

	function updateRadius(obj: CircleMarker, preOpt: CircleMarkerOptions, opt: CircleMarkerOptions) {
		if (opt.radius !== preOpt.radius && opt.radius !== undefined) {
			obj.setRadius(opt.radius);
		}
	}

	function updateStyle(obj: CircleMarker, preOpt: CircleMarkerOptions, opt: CircleMarkerOptions) {
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

	function storeProps(props: { latlng: LatLngExpression; options: CircleMarkerOptions }) {
		const { latlng, options } = props;
		preLatLng = latlng;
		preOptions = Object.create(options);
	}

	function reset() {
		$circleMarkerStore?.remove();
		$circleMarkerStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(circleMarkerStore);
</script>

<slot />
