<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import { Rectangle, Map } from 'leaflet';
	import type { LatLngBoundsExpression, PathOptions, PolylineOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// props
	export let latLngBounds: LatLngBoundsExpression;
	export let options: PolylineOptions = {};
	export let instance: Rectangle | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let rectangle: Rectangle | undefined;
	let preLatLngBounds = latLngBounds;
	let preOptions = options;
	let ready = false;

	$: map = getMap?.();
	$: layer = getLayer?.();
	$: instance = rectangle;

	onMount(() => {
		rectangle = new Rectangle(latLngBounds, options);
		storeProps({ latLngBounds, options });
		ready = true;
	});

	$: if (map) {
		if (rectangle) {
			updateBounds(rectangle, preLatLngBounds, latLngBounds);
			updateStyle(rectangle, preOptions, options);

			if (layer) {
				layer.addLayer(rectangle);
			} else {
				map.addLayer(rectangle);
			}
			storeProps({
				latLngBounds,
				options
			});
		}
	}

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
		rectangle?.remove();
		rectangle = undefined;
	}

	onDestroy(() => {
		reset();
	});

	setContext(Map, { ...parentContext, getOverlay: () => rectangle });
</script>

{#if ready}
	<slot />
{/if}
