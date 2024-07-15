<script lang="ts">
	import { onDestroy, onMount, setContext, getContext } from 'svelte';
	import { Circle, Map } from 'leaflet';
	import type { LatLngExpression, CircleOptions, PathOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latLng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let circle: Circle | undefined;
	let preLatLng = latLng;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = circle;

	onMount(() => {
		circle = new Circle(latLng, options);
		storeProps({
			latLng,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (circle) {
			updatetLatLng(circle, preLatLng, latLng);

			updateRadius(circle, preOptions, options);

			updateStyle(circle, preOptions, options);

			if (layer) {
				layer.addLayer(circle);
			} else {
				map.addLayer(circle);
			}
			storeProps({
				latLng,
				options
			});
		}
	}

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
		circle?.remove();
		circle = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => circle });
</script>

{#if ready}
	<slot />
{/if}
