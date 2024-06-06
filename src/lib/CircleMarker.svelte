<script lang="ts">
	import { useConsumeMap } from './context.ts';
	import { CircleMarker, type LatLngExpression, type CircleMarkerOptions } from 'leaflet';

	let { map: mapStore } = useConsumeMap();

	export let latlng: LatLngExpression;
	export let options: CircleMarkerOptions = { radius: 1 };

	if ($mapStore) {
		let circleMarker = new CircleMarker(latlng, options);
		circleMarker.addTo($mapStore);
	}
</script>
