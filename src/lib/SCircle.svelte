<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Circle } from 'leaflet';
	import type { LatLngExpression, CircleOptions } from 'leaflet';
	import { useConsumeMap, useConsumeLayerGroup, useProvideLayer } from '$lib/context';

	export let latlng: LatLngExpression;
	export let options: CircleOptions = { radius: 100 };
	export let instance: Circle | undefined = undefined;

	let preLatlng = latlng;
	let preOptions = options;

	onMount(() => {
		console.log('zzh mount', latlng);
		$circleStore = new Circle(latlng, options);
		storeProps();
	});

	let mapStore = useConsumeMap();
	let layerGroupStore = useConsumeLayerGroup();
	let circleStore = writable<Circle | undefined>();

	$: if ($mapStore) {
		if ($circleStore) {

			if (latlng !== preLatlng && latlng !== undefined) {
				console.log('zzh setlatlng', latlng);
				$circleStore.setLatLng(latlng);
			}

			if (options.radius !== preOptions.radius && options.radius !== undefined) {
				$circleStore.setRadius(options.radius);
			}

			// todo latlng
			// todo other style
			if (options.color !== preOptions.color && options.color !== undefined) {
				$circleStore.setStyle({ color: options.color });
			}

			if ($layerGroupStore) {
				$layerGroupStore.addLayer($circleStore);
			} else {
				$circleStore.addTo($mapStore);
			}
			storeProps();
		}
	}

	$: instance = $circleStore;

	function storeProps() {
		preLatlng = latlng;
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
