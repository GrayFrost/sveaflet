<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { CircleMarker, Map } from 'leaflet';
	import type { LatLngExpression, CircleMarkerOptions, PathOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 10 };
	export let instance: CircleMarker | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let circleMarker: CircleMarker | undefined;
	let preLatLng = latlng;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = circleMarker;

	onMount(() => {
		circleMarker = new CircleMarker(latlng, options);
		storeProps({
			latlng,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (circleMarker) {
			updatetLatLng(circleMarker, preLatLng, latlng);

			updateRadius(circleMarker, preOptions, options);

			updateStyle(circleMarker, preOptions, options);

			if (layer) {
				layer.addLayer(circleMarker);
			} else {
				map.addLayer(circleMarker);
			}
			storeProps({
				latlng,
				options
			});
		}
	}

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
		circleMarker?.remove();
		circleMarker = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => circleMarker }));
</script>

{#if ready}
	<slot />
{/if}
