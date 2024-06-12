<script lang="ts">
import { onDestroy } from 'svelte';
import { DivIcon } from 'leaflet';
import { useConsumeMap, useConsumeMarker } from './context.ts';
import type { DivIconOptions } from 'leaflet';

let { map: mapStore } = useConsumeMap();
let markerStore = useConsumeMarker();

export let options: DivIconOptions = {}

let divIcon: DivIcon | undefined;

if ($mapStore && $markerStore) {
  divIcon = new DivIcon(options);
  $markerStore.setIcon(divIcon);
}

onDestroy(() => {
  divIcon?.remove?.();
  divIcon = undefined;
})
</script>

<slot />
