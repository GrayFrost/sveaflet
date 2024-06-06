<script lang="ts">
  import { useConsumeMap } from './context.ts';
  import { writable } from 'svelte/store';
	import { LayerGroup, type LayerOptions } from 'leaflet?client';
  import { useProvideLayerGroup } from './context.ts';

  let { map: mapStore } = useConsumeMap();

  let layerGroupStore = writable<LayerGroup | undefined>();
  export let options: LayerOptions = {};

  useProvideLayerGroup(layerGroupStore);

  if ($mapStore) {
    $layerGroupStore = new LayerGroup([], options);
    $layerGroupStore.addTo($mapStore);
  }
</script>

<slot />