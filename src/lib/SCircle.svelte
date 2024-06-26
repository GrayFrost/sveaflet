<script lang="ts">
	import { onDestroy, onMount, setContext, getContext } from 'svelte';
	import { Circle, Map, Layer } from 'leaflet';
	import type { LatLngExpression, CircleOptions, PathOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	let circle: Circle | undefined;
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let preLatLng = latlng;
	let preOptions = options;

	let ready = false;

	$:map = getMap?.();
	$: layer = getLayer?.();

	onMount(() => {
		circle = new Circle(latlng, options);
		storeProps({
			latlng,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (circle) {
			updatetLatLng(circle, preLatLng, latlng);

			updateRadius(circle, preOptions, options);

			updateStyle(circle, preOptions, options);

			if (layer) {
				layer.addLayer(circle);
			} else {
				map.addLayer(circle);
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

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => circle }));
</script>

{#if ready}
	<slot />
{/if}
