<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import { Map, Control } from 'leaflet';
	import type { ControlOptions } from 'leaflet';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	export let options: ControlOptions = { position: 'topright' };
	export let instance: Control | undefined = undefined;

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let control: Control | undefined;
	let htmlElement: HTMLElement;
	let ready = false;
	let compare: Compare;

	$: map = getMap?.();
	$: instance = control;

	onMount(() => {
		let CustomControl: { new (...args: any[]): { onAdd(): HTMLElement } } & typeof Control;
		// @ts-ignore
		CustomControl = Control.extend({
			onAdd() {
				return htmlElement;
			}
		});
		control = new CustomControl(options);
		compare = new Compare(control, $$props);
		ready = true;
	});

	$: if (map) {
		if (control) {
			compare.updateProps($$props);
			map.addControl(control);
			compare.storeProps($$props);
		}
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
	{#if ready}
		<slot />
	{/if}
</div>
