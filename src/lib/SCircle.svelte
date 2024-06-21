<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Circle } from 'leaflet';
	import type { LatLngExpression, CircleOptions, PathOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latLng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let circleStore = writable<Circle | undefined>();

	// data
	let preLatLng = latLng;
	let preOptions = options;

	onMount(() => {
		$circleStore = new Circle(latLng, options);
		storeProps({
			latLng,
			options
		});
	});

	$: if ($mapStore) {
		if ($circleStore) {
			updatetLatLng($circleStore, preLatLng, latLng);

			updateRadius($circleStore, preOptions, options);

			updateStyle($circleStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($circleStore);
			} else {
				$circleStore.addTo($mapStore);
			}
			storeProps({
				latLng,
				options
			});
		}
	}

	$: instance = $circleStore;

	function updatetLatLng(obj: Circle, preLatLng: LatLngExpression, latLng: LatLngExpression) {
		if (latLng !== preLatLng && latLng !== undefined) {
			obj.setLatLng(latLng);
		}
	}

	function updateRadius(obj: Circle, preOpt: CircleOptions, opt: CircleOptions) {
		if (opt.radius !== preOpt.radius && opt.radius !== undefined) {
			obj.setRadius(opt.radius);
		}
	}

	function updateStyle(obj: Circle, preOpt: CircleOptions, opt: CircleOptions) {
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

	function storeProps(props: { latLng: LatLngExpression; options: CircleOptions }) {
		const { latLng, options } = props;
		preLatLng = latLng;
		preOptions = Object.create(options);
	}

	function reset() {
		$circleStore?.remove();
		$circleStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(circleStore);
</script>

<slot />
