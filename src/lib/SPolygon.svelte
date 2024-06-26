<script lang="ts">
	import { onMount, onDestroy, setContext, getContext } from 'svelte';
	import { Polygon, Map } from 'leaflet';
	import type { LatLngExpression, PathOptions, PolylineOptions } from 'leaflet';

	// props
	export let latLngs: LatLngExpression[];
	export let options: PolylineOptions = {};
	export let instance: Polygon | undefined = undefined;

	// store
	let parentContext: any = getContext(Map);
	const { getMap, getLayer } = parentContext;

	let polygon: Polygon | undefined;

	// data
	let preLatLngs = latLngs;
	let preOptions = options;

	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();

	onMount(() => {
		polygon = new Polygon(latLngs, options);
		storeProps({
			latLngs,
			options
		});
		ready = true;
	});

	$: if (map) {
		if (polygon) {
			updateLatLngs(polygon, preLatLngs, latLngs);
			updateStyle(polygon, preOptions, options);

			if (layer) {
				layer.addLayer(polygon);
			} else {
				map.addLayer(polygon);
			}
			storeProps({
				latLngs,
				options
			});
		}
	}

	$: instance = polygon;

	function updateLatLngs(
		obj: Polygon,
		preLatLngs: LatLngExpression[],
		latLngs: LatLngExpression[]
	) {
		if (preLatLngs !== latLngs && latLngs !== undefined) {
			obj.setLatLngs(latLngs);
		}
	}

	function updateStyle(obj: Polygon, preOpt: PolylineOptions, opt: PolylineOptions) {
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
		polygon?.remove();
		polygon = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, Object.freeze({ ...parentContext, getOverlay: () => polygon }));
</script>

{#if ready}
	<slot />
{/if}
