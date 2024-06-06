<script lang="ts">
  import { control, type Control } from 'leaflet?client';
	import { useConsumeMap } from './context.ts';

  export let options: Control.ScaleOptions = {};

  let { map: mapStore } = useConsumeMap();
  let scale: Control.Scale | undefined;

  if ($mapStore) {
    scale = control.scale(options);
    scale.addTo($mapStore);
  }
</script>