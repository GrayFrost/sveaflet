<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Control } from 'leaflet';
	import type { ControlOptions } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	export let options: ControlOptions = { position: 'topright' };
	export let instance: Control | undefined = undefined;

	let mapStore = useConsumeMap();

	let control: Control | undefined;
	let htmlElement: HTMLElement;

	let CustomControl: { new (...args: any[]): { onAdd(): HTMLElement } } & typeof Control;

	onMount(() => {
		// @ts-ignore
		CustomControl = Control.extend({
			onAdd() {
				return htmlElement;
			}
		});
	});

	$: if ($mapStore && CustomControl) {
		reset();
		control = new CustomControl(options);
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
