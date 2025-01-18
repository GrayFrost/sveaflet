<script lang="ts">
	import { onMount, onDestroy, getContext, type Snippet } from 'svelte';
	import { Map, Control } from 'leaflet';
	import type { ControlOptions } from 'leaflet';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LeafletContextInterface } from './types';
	import { Compare } from './utils/index';

	// props
	type Props = {
		options: ControlOptions;
		instance?: Control;
		children?: Snippet;
	} & HTMLAttributes<HTMLDivElement> & { [key: string]: unknown };

	let {
		options = { position: 'topright' },
		instance = $bindable(),
		children,
		...restProps
	}: Props = $props();

	let latestProps = $derived.by(() => ({
		options,
		...restProps
	}));

	// context
	let parentContext = getContext<LeafletContextInterface>(Map);
	const { getMap } = parentContext;

	// data
	let ready = $state(false);
	let control: Control | undefined = $state();
	let compare: Compare | undefined;

	let map: Map | undefined = $derived(getMap?.());

	// refs
	let htmlElement: HTMLElement;

	$effect(() => {
		instance = control;
	});

	onMount(() => {
		let CustomControl: { new (...args: any[]): { onAdd(): HTMLElement } } & typeof Control;
		// @ts-ignore
		CustomControl = Control.extend({
			onAdd() {
				return htmlElement;
			}
		});

		const props = {
			options,
			...restProps
		};

		control = new CustomControl(options);

		compare = new Compare(control, latestProps);
		ready = true;
	});

	$effect(() => {
		if (map) {
			if (control) {
				compare?.updateProps(latestProps);
				map.addControl(control);
				compare?.storeProps(latestProps);
			}
		}
	});

	function reset() {
		control?.remove();
		control = undefined;
	}

	onDestroy(() => {
		reset();
	});
</script>

<div bind:this={htmlElement} {...restProps} class={`leaflet-control ${restProps.class ?? ''}`}>
	{#if ready}
		{@render children?.()}
	{/if}
</div>
