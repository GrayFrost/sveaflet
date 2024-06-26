<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Polyline, Map } from 'leaflet';
	import type { LatLngExpression, PathOptions, PolylineOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latLngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polyline | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let polyline: Polyline | undefined;
	let preLatLngs = latLngs;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = polyline;

	onMount(() => {
		polyline = new Polyline(latLngs, options);

		storeProps({
			latLngs,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (polyline) {
			updateLatLngs(polyline, preLatLngs, latLngs);
			updateStyle(polyline, preOptions, options);

			if (layer) {
				layer.addLayer(polyline);
			} else {
				map.addLayer(polyline);
			}
			storeProps({
				latLngs,
				options
			});
		}
	}

	function updateLatLngs(
		obj: Polyline,
		preLatLngs: LatLngExpression[],
		latLngs: LatLngExpression[]
	) {
		if (preLatLngs !== latLngs && latLngs !== undefined) {
			obj.setLatLngs(latLngs);
		}
	}

	function updateStyle(obj: Polyline, preOpt: PolylineOptions, opt: PolylineOptions) {
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
		polyline?.remove();
		polyline = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => polyline });
</script>

{#if ready}
	<slot />
{/if}
