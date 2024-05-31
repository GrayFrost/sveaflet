<script lang="ts">
  import { type LatLngExpression, type MarkerOptions, Marker } from 'leaflet';
  import { onMount, onDestroy, setContext, getContext } from 'svelte';
  import { useConsumeMap } from './context.ts';

  export let latlng: LatLngExpression;
  export let options: MarkerOptions = {};

  let map = useConsumeMap()(); 

  onMount(() => {
    if (map) {
      let marker = new Marker(latlng, options);
      marker.addTo(map);
    }
    
  })

  onDestroy(() => {})

</script>