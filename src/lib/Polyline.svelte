<script lang="ts">
  import { onMount } from 'svelte';
  import { useConsumeMap } from './Map.svelte';
  import { Polyline, type LatLngExpression, type PolylineOptions } from 'leaflet';

  let map = useConsumeMap()();

  export let latlngs: LatLngExpression[];
  export let options: PolylineOptions = {};

  onMount(() => {
    if (map) {
      let polyline = new Polyline(latlngs, options);
      polyline.addTo(map);

      // map.fitBounds(polyline.getBounds()); // todo
    }
  })
</script>