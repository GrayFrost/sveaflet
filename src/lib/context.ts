import { setContext, getContext } from 'svelte';
import type { MapContext } from './types.ts';

const MapContextKey = Symbol();

const useProvideMap = (state: MapContext) => {
	setContext<MapContext>(MapContextKey, state);
};

const useConsumeMap = (): MapContext => {
	return getContext<MapContext>(MapContextKey);
};


export { useProvideMap, useConsumeMap };