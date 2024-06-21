<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';
	import { Rectangle } from 'leaflet';
	import type { LatLngBoundsExpression, PathOptions, PolylineOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};
	export let instance: Rectangle | undefined = undefined;

	// store
	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let rectangleStore = writable<Rectangle | undefined>();

	// data
	let preLatLngBounds = latLngBounds;
	let preOptions = options;

	onMount(() => {
		$rectangleStore = new Rectangle(latLngBounds, options);
		storeProps({ latLngBounds, options });
	});

	$: if ($mapStore) {
		if ($rectangleStore) {
			updateBounds($rectangleStore, preLatLngBounds, latLngBounds);
			updateStyle($rectangleStore, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($rectangleStore);
			} else {
				$rectangleStore.addTo($mapStore);
			}
			storeProps({
				latLngBounds,
				options
			});
		}
	}

	$: instance = $rectangleStore;

	function updateBounds(
		obj: Rectangle,
		preLatLngBounds: LatLngBoundsExpression,
		latLngBounds: LatLngBoundsExpression
	) {
		if (latLngBounds !== preLatLngBounds && latLngBounds !== undefined) {
			obj.setBounds(latLngBounds);
		}
	}

	function updateStyle(obj: Rectangle, preOpt: PolylineOptions, opt: PolylineOptions) {
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

	function storeProps(props: { latLngBounds: LatLngBoundsExpression; options: PolylineOptions }) {
		const { latLngBounds, options } = props;
		preLatLngBounds = latLngBounds;
		preOptions = Object.create(options);
	}

	function reset() {
		$rectangleStore?.remove();
		$rectangleStore = undefined;
	}

	onDestroy(() => {
		reset();
	});

	useProvideLayer(rectangleStore);
</script>

<slot />
