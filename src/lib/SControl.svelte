<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Control } from 'leaflet';
	import type { ControlOptions } from 'leaflet';
	import { useConsumeMap } from '$lib/context';

	// props
	export let options: ControlOptions = { position: 'topright' };
	export let instance: Control | undefined = undefined;

	// store
	let mapStore = useConsumeMap();

	// data
	let control: Control | undefined;
	let htmlElement: HTMLElement;
	let preOptions = options;

	// class
	let CustomControl: { new (...args: any[]): { onAdd(): HTMLElement } } & typeof Control;

	onMount(() => {
		// @ts-ignore
		CustomControl = Control.extend({
			onAdd() {
				return htmlElement;
			}
		});
		control = new CustomControl(options);
		storeProps();
	});

	$: if ($mapStore) {
		if (control) {
			updatePosition(control, preOptions, options);
			control.addTo($mapStore);
			storeProps();
		}
	}

	$: instance = control;

	function updatePosition(obj: Control, preOpt: ControlOptions, opt: ControlOptions) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function storeProps() {
		preOptions = Object.create(options);
	}

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
