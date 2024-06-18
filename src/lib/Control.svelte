<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ControlOptions } from 'leaflet';
	import { Control } from 'leaflet';
	import { useConsumeMap } from './context.ts';

	export let options: ControlOptions = {};
	export let instance: Control | undefined = undefined;

	let mapStore = useConsumeMap();

	let control: Control | undefined;
	let htmlElement: HTMLElement;

	let CustonControl: { new (...args: any[]): { onAdd(): HTMLElement } } & typeof Control;

	onMount(() => {
		// @ts-ignore
		CustonControl = Control.extend({
			onAdd() {
				return htmlElement;
			}
		});
	});

	$: if ($mapStore && CustonControl) {
		reset();
		control = new CustonControl(options);
		control.addTo($mapStore);
	}

	$: instance = control;

	function reset() {
		control?.remove();
		control = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

<div bind:this={htmlElement} {...$$restProps} class={`leaflet-control ${$$restProps.class ?? ''}`}>
	<slot />
</div>
