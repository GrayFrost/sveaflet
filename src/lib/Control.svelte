<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ControlOptions } from 'leaflet';
	import { Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: ControlOptions = {};

	let { map: mapStore } = useConsumeMap();
	let control: Control | undefined;
	let htmlElement: HTMLElement | undefined;

	let CustonControl;

	onMount(() => {
		CustonControl = Control.extend({
			onAdd(map) {
				return htmlElement;
			}
		});
	});

	$: if ($mapStore && CustonControl) {
		control = new CustonControl(options);
		control.addTo($mapStore);
	}

	onDestroy(() => {
		control?.remove();
		control = undefined;
	});
</script>

<div bind:this={htmlElement}>
	<slot />
</div>
