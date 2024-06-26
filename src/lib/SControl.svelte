<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Control } from 'leaflet';
	import type { ControlOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';

	// todo fix bugs
	// props
	export let options: ControlOptions = { position: 'topright' };
	export let instance: Control | undefined = undefined;

	// store
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap, getLayer } = parentContext;

	// data
	let control: Control | undefined;
	let htmlElement: HTMLElement;
	let preOptions = options;
	let ready = false;

	// class
	let CustomControl: { new (...args: any[]): { onAdd(): HTMLElement } } & typeof Control;

	$: map = getMap?.();

	onMount(() => {
		// @ts-ignore
		CustomControl = Control.extend({
			onAdd() {
				return htmlElement;
			}
		});
		control = new CustomControl(options);
		storeProps({
			options
		});
		ready = true;
	});

	$: if (map) {
		if (control) {
			updatePosition(control, preOptions, options);
			map.addControl(control);
			storeProps({ options });
		}
	}

	$: instance = control;

	function updatePosition(obj: Control, preOpt: ControlOptions, opt: ControlOptions) {
		if (opt.position !== preOpt.position && opt.position !== undefined) {
			obj.setPosition(opt.position);
		}
	}

	function storeProps(props: { options: ControlOptions }) {
		const { options } = props;
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

{#if ready}
	<div
		bind:this={htmlElement}
		{...$$restProps}
		class={`leaflet-control ${$$restProps.class ?? ''}`}
	>
		<slot />
	</div>
{/if}
