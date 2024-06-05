<script lang="ts">
	import { control, type Control } from 'leaflet?client';
	import { useConsumeMap } from './context.ts';

  export let options: Control.ZoomOptions = {};

  let mapStore = useConsumeMap();
  let zoom: Control.Zoom | undefined;

  if ($mapStore) {
    zoom = control.zoom(options);
    zoom.addTo($mapStore);
  }
</script>