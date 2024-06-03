<script lang="ts">
  	import { control, type Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

  export let options: Control.AttributionOptions = {};
  let mapStore = useConsumeMap();
  let attribution: Control.Attribution | undefined;

  if ($mapStore) {
    attribution = control.attribution(options);
    attribution.addTo($mapStore);
  }
</script>