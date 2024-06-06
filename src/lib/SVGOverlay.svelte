<script lang="ts">
  import { useConsumeMap } from './context.ts';
	import { SVGOverlay, type LatLngBoundsExpression, type ImageOverlayOptions } from 'leaflet?client';

  let { map: mapStore } = useConsumeMap();

  export let svgImage: string | SVGElement;
  export let bounds: LatLngBoundsExpression;
  export let options: ImageOverlayOptions = {}

  if ($mapStore) {
    let svgOverlay = new SVGOverlay(svgImage, bounds, options);
  }

</script>

<slot />