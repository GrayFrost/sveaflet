<script lang="ts">
  import { onMount } from 'svelte';
  import { useConsumeMap } from './context.ts';
  import { Polygon, type LatLngExpression, type PolylineOptions } from 'leaflet';

  let map = useConsumeMap()();

  export let latlngs: LatLngExpression[];
  export let options: PolylineOptions = {};

  onMount(() => {
    if (map) {
      let polygon = new Polygon(latlngs, options);
      polygon.addTo(map);
    }
  })
</script>