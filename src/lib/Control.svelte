<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ControlOptions } from 'leaflet';
	import { Control } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

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
		if (!control) {
			control = new CustonControl(options);
		}
		control.addTo($mapStore);
	}

	$: instance = control;

	onDestroy(() => {
		control?.remove();
		control = undefined;
	});
</script>

<div bind:this={htmlElement} {...$$restProps} class={`leaflet-control ${$$restProps.class ?? ''}`}>
	<slot />
</div>
