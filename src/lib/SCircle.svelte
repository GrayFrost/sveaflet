<script lang="ts">
	import { onDestroy, onMount, setContext, getContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Circle, Map, Layer } from 'leaflet';
	import type { LatLngExpression, CircleOptions, PathOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	// props
	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	// store
	// let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	// let circleStore = writable<Circle | undefined>();

	let circle: Circle | undefined;
	let parentContext: any = getContext(Map)();
	console.log('zzh parentContext', parentContext);

	// data
	let preLatLng = latlng;
	let preOptions = options;

	let ready = false;

	onMount(() => {
		circle = new Circle(latlng, options);
		storeProps({
			latlng,
			options
		});
		ready = true;
	});

	$: if (parentContext.map) {
		if (circle) {
			updatetLatLng(circle, preLatLng, latlng);

			updateRadius(circle, preOptions, options);

			updateStyle(circle, preOptions, options);

			if ($layerGroupStore) {
				$layerGroupStore.addLayer(circle);
			} else {
				circle.addTo(parentContext.map);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

	$: instance = circle;

	function updatetLatLng(obj: Circle, preLatLng: LatLngExpression, latlng: LatLngExpression) {
		if (latlng !== preLatLng && latlng !== undefined) {
			obj.setLatLng(latlng);
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

	function storeProps(props: { latlng: LatLngExpression; options: CircleOptions }) {
		const { latlng, options } = props;
		preLatLng = latlng;
		preOptions = Object.create(options);
	}

	function reset() {
		circle?.remove();
		circle = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, () => Object.freeze({ ...parentContext, overlayContainer: () => circle }));
</script>

{#if ready}
	<slot />
{/if}
