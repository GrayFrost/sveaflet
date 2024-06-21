<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { CircleMarker } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, PathOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latLng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let circleMarkerStore = writable<CircleMarker | undefined>();

	// data
	let preLatLng = latLng;
	let preOptions = options;

	onMount(() => {
		$circleMarkerStore = new CircleMarker(latLng, options);
		storeProps({
			latLng,
			options
		});
	});

	$: if ($mapStore) {
		if ($circleMarkerStore) {
			updatetLatLng($circleMarkerStore, preLatLng, latLng);

			updateRadius($circleMarkerStore, preOptions, options);

			updateStyle($circleMarkerStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($circleMarkerStore);
			} else {
				$circleMarkerStore.addTo($mapStore);
			}
			storeProps({
				latLng,
				options
			});
		}
	}

	$: instance = $circleMarkerStore;

	function updatetLatLng(obj: CircleMarker, preLatLng: LatLngExpression, latLng: LatLngExpression) {
		if (latLng !== preLatLng && latLng !== undefined) {
			obj.setLatLng(latLng);
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

	function storeProps(props: { latLng: LatLngExpression; options: CircleMarkerOptions }) {
		const { latLng, options } = props;
		preLatLng = latLng;
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
