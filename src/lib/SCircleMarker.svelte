<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { CircleMarker, Map } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, PathOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latLng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let circleMarker: CircleMarker | undefined;
	let preLatLng = latLng;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = circleMarker;

	onMount(() => {
		circleMarker = new CircleMarker(latLng, options);
		storeProps({
			latLng,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (circleMarker) {
			updatetLatLng(circleMarker, preLatLng, latLng);

			updateRadius(circleMarker, preOptions, options);

			updateStyle(circleMarker, preOptions, options);

			if (layer) {
				layer.addLayer(circleMarker);
			} else {
				map.addLayer(circleMarker);
			}
			storeProps({
				latLng,
				options
			});
		}
	}

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
		circleMarker?.remove();
		circleMarker = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => circleMarker });
</script>

{#if ready}
	<slot />
{/if}
