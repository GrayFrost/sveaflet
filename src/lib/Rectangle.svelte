<script lang="ts">
  import { onMount } from 'svelte';
  import { useConsumeMap } from './Map.svelte';
  import { Rectangle, type LatLngBoundsExpression, type PolylineOptions } from 'leaflet';

  let map = useConsumeMap()();

  export let latLngBounds: LatLngBoundsExpression;
  export let options: PolylineOptions = {};

  onMount(() => {
    if (map) {
      let rectangle = new Rectangle(latLngBounds, options);
      rectangle.addTo(map);
    }
  })
</script>